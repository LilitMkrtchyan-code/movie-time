import "./Pagination.css";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const visiblePages = [];
    const startPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
    let endPage = startPage + 9;

    if (endPage > totalPages) {
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="pagination-container">
      <ul className="pagination">
        <li
          className={`${currentPage <= 1 ? "disabled" : ""}`}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <a href="#!">
            <i className="fas fa-chevron-left" />
          </a>
        </li>
        {visiblePages.map((page) => (
          <li
            key={page}
            className={`${currentPage === page ? "active" : ""}`}
            onClick={() => handlePageChange(page)}
          >
            <a href="#!">{page}</a>
          </li>
        ))}
        <li
          className={`${currentPage === totalPages ? "disabled" : ""}`}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <a href="#!">
            <i className="fas fa-chevron-right" />
          </a>
        </li>
      </ul>
    </div>
  );
};
