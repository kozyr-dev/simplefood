import React, { useState, useEffect, JSX } from "react";
import clsx from "clsx";
import styles from "./Pagination.module.scss";

interface PageProps {
  page?: number;
  pageSize?: number;
  pageCount?: number;
  total?: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PageProps> = (props) => {
  const { page = 1, pageSize = 10, pageCount = 1, total = 1 } = props;
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    props.onPageChange(currentPage);
  }, [currentPage, props]);

  const getPages = (pages: number): JSX.Element[] => {
    const content = [];
    for (let i = 1; i <= pages; i++) {
      content.push(
        <li key={i} className={`page ${i === currentPage ? styles["page--current"] : ""}`}>
          <a href={`${i}`} onClick={(e): void => clickHandler(e, i)}>
            {i}
          </a>
        </li>,
      );
    }
    return content;
  };

  const clickHandler = (e: React.MouseEvent<HTMLAnchorElement>, pageId: number): void => {
    e.preventDefault();
    if (pageId <= 0 || pageId > pageCount) return;
    setCurrentPage(pageId);
  };

  return (
    <div>
      {pageCount > 1 && (
        <div className={styles.pagination}>
          <ul>
            <li className={clsx(styles["prev"], { [styles["disabled"]]: currentPage === 1 })}>
              <a href={`${currentPage - 1}`} onClick={(e): void => clickHandler(e, currentPage - 1)}>
                <em className="icon icon-left-open-big"></em>
              </a>
            </li>

            {getPages(pageCount)}

            <li className={clsx(styles["next"], { [styles["disabled"]]: currentPage === pageCount })}>
              <a href={`${currentPage + 1}`} onClick={(e): void => clickHandler(e, currentPage + 1)}>
                <em className="icon icon-right-open-big"></em>
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Pagination;
