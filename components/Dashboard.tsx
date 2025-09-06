import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { VisitorLog, SortConfig, SortableField } from '../types';
import SearchBar from './SearchBar';
import LogTable from './LogTable';
import Pagination from './Pagination';
import LogDetailModal from './LogDetailModal';

interface DashboardProps {
    userPath: string;
    onLogout: () => void;
}

const ITEMS_PER_PAGE = 15;
const API_BASE_URL = 'https://abubasith86-logs-hook-server.hf.space/public';
const POLLING_INTERVAL = 5000; // 5 seconds

// Custom hook for debouncing input
const useDebounce = (value: string, delay: number): string => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};


const Dashboard: React.FC<DashboardProps> = ({ userPath, onLogout }) => {
    const [logs, setLogs] = useState<VisitorLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    
    const [sortConfig, setSortConfig] = useState<SortConfig | null>({ key: 'timestamp', direction: 'descending' });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalLogs, setTotalLogs] = useState(0);
    const [selectedLog, setSelectedLog] = useState<VisitorLog | null>(null);

    const fetchLogs = useCallback(async (isPolling = false) => {
        if (!isPolling) {
            setLoading(true);
        }
        setError(null);

        const params = new URLSearchParams({
            page: userPath,
            include_payload: 'true',
            limit: String(ITEMS_PER_PAGE),
            offset: String((currentPage - 1) * ITEMS_PER_PAGE),
        });

        if (debouncedSearchTerm) {
            params.append('q', debouncedSearchTerm);
        }

        try {
            const response = await fetch(`${API_BASE_URL}?${params.toString()}`);
            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();

            const mappedLogs: VisitorLog[] = data.items.map((item: any) => ({
                id: item.id,
                ipAddress: item.ip || 'N/A',
                location: `${item.visitor_info?.city || 'Unknown'}, ${item.visitor_info?.country_code || 'N/A'}`,
                country: item.visitor_info?.country_name || 'Unknown',
                timestamp: new Date(item.created_at * 1000),
                userAgent: item.user_agent || 'N/A',
                referrer: item.ref || 'N/A',
                organization: item.visitor_info?.org || 'N/A',
                asn: item.visitor_info?.asn || 'N/A',
                timezone: item.visitor_info?.timezone || 'N/A',
                coordinates: item.visitor_info?.latitude && item.visitor_info?.longitude ? `${item.visitor_info.latitude}, ${item.visitor_info.longitude}` : 'N/A',
            }));
            
            setLogs(mappedLogs);
            setTotalLogs(data.total);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            if (!isPolling) {
              setLogs([]);
              setTotalLogs(0);
            }
        } finally {
            if (!isPolling) {
                setLoading(false);
            }
        }
    }, [userPath, currentPage, debouncedSearchTerm]);


    // Effect for initial fetch and fetches on dependency change
    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    // Effect for polling
    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchLogs(true); // Pass true to indicate it's a polling call
        }, POLLING_INTERVAL);

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, [fetchLogs]);


    const handleSort = useCallback((key: SortableField) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    }, [sortConfig]);

    const sortedLogs = useMemo(() => {
        const sortableLogs = [...logs];
        if (!sortConfig) return sortableLogs;

        sortableLogs.sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue < bValue) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        return sortableLogs;
    }, [logs, sortConfig]);

    // Reset page to 1 when search term changes
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearchTerm]);

    return (
        <div className="text-white">
            <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                 <div>
                    <h1 className="text-3xl font-bold">Visitor Logs</h1>
                    <p className="text-slate-400">Welcome back, <span className="font-semibold text-slate-300 capitalize">{userPath}</span>.</p>
                </div>
                <button 
                    onClick={onLogout}
                    className="px-4 py-2 text-sm font-medium bg-slate-700 rounded-md hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Logout
                </button>
            </header>
            
            <div className="space-y-4">
                 <div className="max-w-md">
                    <SearchBar value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search IP, user agent, etc..."/>
                </div>

                <LogTable 
                    logs={sortedLogs} 
                    onRowClick={setSelectedLog} 
                    sortConfig={sortConfig}
                    onSort={handleSort}
                    loading={loading}
                    error={error}
                />

                <Pagination 
                    currentPage={currentPage}
                    totalLogs={totalLogs}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageChange={setCurrentPage}
                />
            </div>
            <LogDetailModal log={selectedLog} onClose={() => setSelectedLog(null)} />
        </div>
    );
};

export default Dashboard;