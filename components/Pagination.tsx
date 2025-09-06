import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalLogs: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalLogs, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalLogs / itemsPerPage);

    if (totalPages <= 1) {
        return null;
    }

    const handlePrev = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex justify-between items-center mt-4 px-4 py-2 bg-slate-800/50 rounded-lg">
            <span className="text-sm text-slate-400">
                Page <span className="font-semibold text-white">{currentPage}</span> of <span className="font-semibold text-white">{totalPages}</span>
            </span>
            <div className="flex items-center space-x-2">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-medium bg-slate-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Go to previous page"
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm font-medium bg-slate-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Go to next page"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;