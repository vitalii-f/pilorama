import ReactPaginate from 'react-paginate'
import styled from 'styled-components'

export const StyledPaginate = styled(ReactPaginate).attrs({
  activeClassName: 'active',
})`
  li a {
    display: block;
    padding: 0.6em 1.2em;
  }
  li:hover,
  .active {
    border-color: #646cff;
  }

  @media (max-width: 375px) {
    li a {
      display: block;
      padding: 0.3em 0.7em;
    }
  }
`

export const StyledSelect = styled.select`
  height: 45px;
  width: 40px;
  border-radius: 5px;
  border: 1px solid var(--color-border-input);
  background-color: var(--color-bg-dark);
  @media (max-width: 375px) {
    height: 35px;
  }
`
