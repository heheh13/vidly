import React from "react";
import PropTypes from "prop-types";
const Pagination = (props) => {
  const { itemCount, pageSize, onPagechange, currentPage } = props;
  const numberOfPage = Math.ceil(itemCount / pageSize);

  if (numberOfPage == 1) return null;
  const pages = [];
  for (let i = 1; i <= numberOfPage; i++) {
    pages.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a onClick={() => onPagechange(page)} className="page-link">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPagechange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
