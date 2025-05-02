import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onChange }) => {
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      // Ensure onChange is a valid function before calling it
      if (typeof onChange === "function") {
        onChange(newPage);  // Call the onChange function
      } else {
        console.error('onChange is not a function');
      }
    }
  };

  return (
    <div className="pagination-container">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
