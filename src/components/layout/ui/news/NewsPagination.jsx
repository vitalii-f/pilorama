import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

let coefficient = 1
window.innerWidth < 700 ? coefficient = 2 : coefficient = 1

const Paginate = styled(ReactPaginate).attrs({
  activeClassName: "active",
})`
  li a {
    display: block;
    padding: ${0.6/coefficient}em ${1.2/coefficient}em;
  }
  li:hover,
  .active {
    border-color: #646cff;
  }
`;
function NewsPagination({ itemsPerPage, setItemsPerPage, currentPage, setCurrentPage, pageCount }) {

  const handlePageClick = (page) => {
    setCurrentPage(page.selected)
  };
  
  return (
    <div className="flex items-center">
        <Paginate
          nextLabel="›"
          onPageChange={handlePageClick}
          pageCount={pageCount}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          previousLabel={"‹"}
          renderOnZeroPageCount={null}
          forcePage={currentPage}
          className="pagination"
        />
        <select
          className="h-10"
          onChange={(item) => {setItemsPerPage(item.target.value)}}
          value={itemsPerPage}>
          <option>2</option>
          <option>5</option>
          <option>10</option>
        </select>
      </div>
  )
}

export default NewsPagination