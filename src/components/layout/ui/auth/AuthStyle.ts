import styled from 'styled-components'

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin-top: 50px;
`

export const StyledInput = styled.input`
  padding: 15px;
  border-radius: 5px;
`

export const StyledErrorParagraph = styled.p`
  color: var(--color-error);
  text-align: center;
`

export const StyledLabel = styled.label`
  font-size: 1.5rem;
  text-align: center;
`