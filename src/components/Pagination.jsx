import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const maxButtons = 5;
    let pages = [];

    let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let end = Math.min(totalPages, start + maxButtons - 1);

    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="Pagination">
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>«</button>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>‹</button>

      {getPageNumbers().map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          style={{
            margin: '0 5px',
            fontWeight: num === currentPage ? 'bold' : 'normal'
          }}
        >
          {num}
        </button>
      ))}

      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>›</button>
      <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>»</button>
    </div>
  );
};

export default Pagination;
