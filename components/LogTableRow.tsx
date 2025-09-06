import React from 'react';
import { VisitorLog } from '../types';

interface LogTableRowProps {
    log: VisitorLog;
    onRowClick: (log: VisitorLog) => void;
}

const LogTableRow: React.FC<LogTableRowProps> = ({ log, onRowClick }) => {
    return (
        <tr 
            onClick={() => onRowClick(log)}
            className="border-b border-slate-700 hover:bg-slate-800/50 transition-colors cursor-pointer"
        >
            <td className="px-4 py-3 text-sm font-mono">{log.ipAddress}</td>
            <td className="px-4 py-3 text-sm">{log.country}</td>
            <td className="px-4 py-3 text-sm">{log.location}</td>
            <td className="px-4 py-3 text-sm text-slate-400">{log.timestamp.toLocaleString()}</td>
        </tr>
    );
};

export default LogTableRow;