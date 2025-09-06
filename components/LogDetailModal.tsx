import React from 'react';
import { VisitorLog } from '../types';

interface LogDetailModalProps {
    log: VisitorLog | null;
    onClose: () => void;
}

const LogDetailModal: React.FC<LogDetailModalProps> = ({ log, onClose }) => {
    if (!log) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="log-details-title"
        >
            <div 
                className="bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-lg text-white" 
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center border-b border-slate-700 pb-3 mb-4">
                    <h3 id="log-details-title" className="text-xl font-bold">Log Details</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors" aria-label="Close modal">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="space-y-3 text-sm">
                    <DetailRow label="ID" value={log.id} />
                    <DetailRow label="IP Address" value={log.ipAddress} />
                    <DetailRow label="Location" value={log.location} />
                    <DetailRow label="Country" value={log.country} />
                    <DetailRow label="Timestamp" value={log.timestamp.toLocaleString()} />
                    <DetailRow label="User Agent" value={log.userAgent} isMono={false} />
                    <DetailRow label="Referrer" value={log.referrer} />
                    <DetailRow label="Organization" value={log.organization} isMono={false} />
                    <DetailRow label="ASN" value={log.asn} />
                    <DetailRow label="Timezone" value={log.timezone} />
                    <DetailRow label="Coordinates" value={log.coordinates} />
                </div>
            </div>
        </div>
    );
};

const DetailRow: React.FC<{ label: string; value: string; isMono?: boolean }> = ({ label, value, isMono = true }) => (
    <div className="flex flex-col sm:flex-row">
        <p className="w-full sm:w-1/3 text-slate-400 font-semibold">{label}:</p>
        <p className={`w-full sm:w-2/3 break-words ${isMono ? 'font-mono' : ''}`}>{value}</p>
    </div>
);


export default LogDetailModal;