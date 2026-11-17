interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="pagination" aria-label="Results pagination">
      <button
        type="button"
        className="pagination_button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      <span className="pagination_info">
        Page {currentPage} of {totalPages}
      </span>

      <button
        type="button"
        className="pagination_button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
