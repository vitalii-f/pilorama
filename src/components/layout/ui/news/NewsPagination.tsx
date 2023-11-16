import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

let coefficient = 1
window.innerWidth < 700 ? coefficient = 2 : coefficient = 1

const StyledPaginate = styled(ReactPaginate).attrs({
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
`

const StyledSelect = styled.select`
  height: 40px;
  width: 40px;
  border-radius: 5px;
  border: 1px solid var(--color-border-input);
  background-color: var(--color-bg-dark);
`

interface NewsPaginationProps {
  itemsPerPage: number
  setItemsPerPage(itemsPerPage: number): void
  currentPage: number
  setCurrentPage(currentPage: number): void
  pageCount: number
}

const NewsPagination = ({ itemsPerPage, setItemsPerPage, currentPage, setCurrentPage, pageCount }: NewsPaginationProps) => {

  const handlePageClick = (page: any) => {
    setCurrentPage(page.selected)
  };
  
  return (
    <div className="flex items-center">
        <StyledPaginate
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
        <StyledSelect
          onChange={(item) => {setItemsPerPage(+item.target.value)}}
          value={itemsPerPage}>
          <option>2</option>
          <option>5</option>
          <option>10</option>
        </StyledSelect>
      </div>
  )
}

export default NewsPagination