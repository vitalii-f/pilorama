import styled from "styled-components"

export const StyledDivWrapper = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`

export const StyledSection = styled.section`
  width: 100%;
  min-height: 100vh;
  padding: 10px 5px;
`