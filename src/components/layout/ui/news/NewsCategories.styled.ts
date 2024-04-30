import styled from "styled-components"

export const StyledContainer = styled.div`
  display: flex;
  gap: 15px;

  padding: 15px 0;
`
export const StyledUl = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 7px 0;

  overflow-x: scroll;
  &::-webkit-scrollbar {
    height: 2px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-bg-scrollbar);
  }
`

export const StyledLi = styled.li`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  padding: 5px 10px;
  background-color: var(--color-bg-input);

  border: 2px solid ${(props) => props.color || '#FFF'};
  border-radius: 10px;

  cursor: pointer;
`