import styled from "styled-components"

export const StyledCommentForm = styled.form`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  width: 100%;
`

export const StyledCommentInput = styled.input`
  width: 100%;
`

export const StyledSubmitButton = styled.button`
  && {
    display: flex;
    gap: 5px;
    @media (max-width: 425px) {
      align-items: center;
      justify-content: center;
      padding: 0em 0.6em;
    }
  }
`

export const StyledCancelButton = styled.button`
  && {
    display: flex;
    gap: 5px;
    @media (max-width: 425px) {
      align-items: center;
      justify-content: center;
      padding: 0em 0.6em;
    }
  }
`
export const StyledSendText = styled.span`
  @media (max-width: 425px) {
    display: none;
  }
`