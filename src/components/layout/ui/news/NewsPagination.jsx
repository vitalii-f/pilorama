import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

const Paginate = styled(ReactPaginate).attrs({
    activeClassName: "active",
  })`
    display: flex;
    margin: 35px auto;
    column-gap: 10px;
  
    li {
      border-radius: 8px;
      border: 1px solid transparent;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s;
    }
  
    li a {
      display: block;
      padding: 0.6em 1.2em;
    }
  
    li:hover,
    .active {
      border-color: #646cff;
    }
  `;

function NewsPagination( {news} ) {

    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(2);
    const [currentPage, setCurrentPage] = useState(0);

    const endOffset = +itemOffset + +itemsPerPage;
    const currentItems = news.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(news.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % news.length;
        setItemOffset(newOffset);
    };
  return (
    <div className="flex items-center">
        <Paginate
          breakLabel="..."
          nextLabel="вперёд"
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={pageCount}
          previousLabel={"назад"}
          forcePage={currentPage}
          renderOnZeroPageCount={null}
        />
        <select
          className="h-10"
          onChange={(item) => {
            setCurrentPage(0);
            setItemsPerPage(item.target.value);
          }}
        >
          <option>2</option>
          <option>3</option>
          <option>5</option>
          <option>10</option>
        </select>
      </div>
  )
}

export default NewsPagination