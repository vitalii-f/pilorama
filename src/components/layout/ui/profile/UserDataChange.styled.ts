import styled from "styled-components"

export const StyledWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;

  background-color: var(--color-backdrop);
`

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 350px;
`