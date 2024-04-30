import styled from "styled-components"

export const StyledContainer = styled.div`
  display: flex;
  gap: 25px 15px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`

export const StyledForm = styled.form`
  flex: 1 0 50%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`

export const StyledCategoryList = styled.div`
  flex: 1 0 50%;

  display: flex;
  flex-direction: column;
  gap: 15px;
`

export const StyledUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

export const StyledLi = styled.li`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  padding: 8px 15px;
  background-color: var(--color-bg-input);

  border: 2px solid white;
  border-radius: 20px;

  @media (max-width: 425px) {
    width: 100%;
  }
`

export const StyledDeleteButton = styled.button`
  border-color: var(--color-red-delete);
  transition: all 0.2s;
  &:hover {
    border-color: var(--color-red-delete);
    box-shadow: 0px 0px 10px 3px rgba(238, 32, 76, 0.75);
  }
`