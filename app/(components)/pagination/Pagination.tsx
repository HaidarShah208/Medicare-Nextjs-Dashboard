import React from "react";

interface PaginationProps {
  currentPage: number;
  patientsPerPage: number;
  totalPatients: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  patientsPerPage,
  totalPatients,
  onPageChange
}) => {
  const totalPages = Math.ceil(totalPatients / patientsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleClick = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination flex">
        <li className={`page-item mx-2 text-base${currentPage === 1 ? 'disabled' : ''}`}>
          <a onClick={() => handleClick(currentPage - 1)} href="#" className={`page-link ps-2 ${currentPage === 1 ? 'text-gray-400' : ''}`} aria-label="Previous">
            &laquo; Prev
          </a>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item mx-2 text-base ${currentPage === number ? 'active' : ''}`}>
            <a onClick={() => handleClick(number)} href="#" className={`page-link ${currentPage === number ? 'text-blue-600 font-bold border-b-2 border-blue-700' : ''}`}>
              {number}
            </a>
          </li>
        ))}
        <li className={`page-item mx-2 pe-2 text-base${currentPage === totalPages ? 'disabled' : ''}`}>
          <a onClick={() => handleClick(currentPage + 1)} href="#" className={`page-link ${currentPage === totalPages ? 'text-gray-400' : ''}`} aria-label="Next">
          Next &raquo;
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
