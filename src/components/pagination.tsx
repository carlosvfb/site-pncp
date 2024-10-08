import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisibleButtons = 5;

  const getVisiblePageNumbers = () => {
    const halfVisible = Math.floor(maxVisibleButtons / 2);
    let start = Math.max(1, currentPage - halfVisible);
    let end = Math.min(totalPages, currentPage + halfVisible);

    if (totalPages > maxVisibleButtons) {
      if (currentPage - halfVisible < 1) {
        end = Math.min(totalPages, end + (halfVisible - (currentPage - 1)));
      }
      if (currentPage + halfVisible > totalPages) {
        start = Math.max(1, start - ((currentPage + halfVisible) - totalPages));
      }
    }

    return { start, end };
  };

  const { start, end } = getVisiblePageNumbers();

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border-2 border-gray-800 rounded hover:text-white hover:border-white transition-colors"
      >
        &laquo;
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border-2 border-gray-800 rounded hover:text-white hover:border-white transition-colors"
      >
        &lt;
      </button>
      {Array.from({ length: end - start + 1 }, (_, i) => start + i).map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 border-2 border-gray-800 rounded hover:text-white hover:border-white transition-colors${currentPage === page ? 'bg-indigo-900 text-white border-white' : ''}`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border-2 border-gray-800 rounded hover:text-white hover:border-white transition-colors"
      >
        &gt;
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border-2 border-gray-800 rounded hover:text-white hover:border-white transition-colors"
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
