import React from 'react';
import { VisitorLog, SortConfig, SortableField } from '../types';
import LogTableRow from './LogTableRow';
import { SortIcon } from './icons/SortIcon';

interface LogTableProps {
    logs: VisitorLog[];
    onRowClick: (log: VisitorLog) => void;
    sortConfig: SortConfig | null;
    onSort: (key: SortableField) => void;
    loading?: boolean;
    error?: string | null;
}

const LogTable: React.FC<LogTableProps> = ({ logs, onRowClick, sortConfig, onSort, loading, error }) => {
    
    const renderSortIcon = (field: SortableField) => {
        if (!sortConfig || sortConfig.key !== field) {
            return <SortIcon className="h-4 w-4 ml-1" />;
        }
        return <SortIcon className="h-4 w-4 ml-1" direction={sortConfig.direction} />;
    };

    const tableHeaders: { key: SortableField; label: string }[] = [
        { key: 'ipAddress', label: 'IP Address' },
        { key: 'country', label: 'Country' },
        { key: 'location', label: 'Location' },
        { key: 'timestamp', label: 'Timestamp' },
    ];
    
    return (
        <div className="overflow-x-auto bg-slate-800 rounded-lg shadow-md">
            <table className="min-w-full text-left text-slate-300">
                <thead className="bg-slate-700/50">
                    <tr>
                        {tableHeaders.map(({ key, label }) => (
                            <th 
                                key={key} 
                                scope="col" 
                                className="px-4 py-3 text-xs font-medium uppercase tracking-wider cursor-pointer select-none"
                                onClick={() => onSort(key)}
                            >
                                <div className="flex items-center">
                                    {label}
                                    {renderSortIcon(key)}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                    {loading ? (
                        <tr>
                            <td colSpan={tableHeaders.length} className="text-center py-8 text-slate-500">
                                Loading logs...
                            </td>
                        </tr>
                    ) : error ? (
                         <tr>
                            <td colSpan={tableHeaders.length} className="text-center py-8 text-red-400">
                                Error: {error}
                            </td>
                        </tr>
                    ) : logs.length > 0 ? (
                        logs.map(log => <LogTableRow key={log.id} log={log} onRowClick={onRowClick} />)
                    ) : (
                        <tr>
                            <td colSpan={tableHeaders.length} className="text-center py-8 text-slate-500">
                                No logs found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default LogTable;