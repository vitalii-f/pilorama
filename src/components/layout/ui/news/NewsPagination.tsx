import { PaginateWrapper, StyledPaginate, StyledSelect } from "./NewsPagination.styled"

interface NewsPaginationProps {
  itemsPerPage: number
  setItemsPerPage(itemsPerPage: number): void
  currentPage: number
  setCurrentPage(currentPage: number): void
  pageCount: number
}

const NewsPagination = ({
  itemsPerPage,
  setItemsPerPage,
  currentPage,
  setCurrentPage,
  pageCount,
}: NewsPaginationProps) => {
  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected)
  }

  return (
    <PaginateWrapper>
      <StyledPaginate
        nextLabel='›'
        onPageChange={handlePageClick}
        pageCount={pageCount}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        previousLabel={'‹'}
        renderOnZeroPageCount={null}
        forcePage={currentPage}
        className='pagination'
      />
      <StyledSelect
        onChange={(item) => {
          setItemsPerPage(+item.target.value)
        }}
        value={itemsPerPage}
      >
        <option>2</option>
        <option>5</option>
        <option>10</option>
      </StyledSelect>
    </PaginateWrapper>
  )
}

export default NewsPagination