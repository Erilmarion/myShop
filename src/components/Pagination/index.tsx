import React from 'react';
import ReactPaginate from "react-paginate";
import styles from './Pagination.module.scss'


type PaginationProps = {
    currentPage: number,
    setPaginationIndex: (page: number) => void,
}

const Pagination: React.FC<PaginationProps> = ({
                                                   currentPage,
                                                   setPaginationIndex

                                               }) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel="next >"
            onPageChange={(event) => {
                setPaginationIndex(event.selected + 1)
            }}
            forcePage={currentPage - 1}
            pageRangeDisplayed={5}
            pageCount={3}
            previousLabel="< previous"
        />
    );
};

export default Pagination;
