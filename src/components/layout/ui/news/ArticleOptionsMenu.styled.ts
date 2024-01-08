import styled from "styled-components"

export const StyledUl = styled.ul`
  position: absolute;
  
  display: flex;
  flex-direction: column;
  gap: 5px;

  border: 1px solid grey;
  border-radius: 5px;
  background-color: var(--color-bg-dark);
  
  padding: 8px;
  z-index: 10;
`

export const StyledLi = styled.li<{type?: string}>`
  color: ${props => props.type === 'delete' ? 'var(--color-red-delete)' : null};
  cursor: pointer;
`