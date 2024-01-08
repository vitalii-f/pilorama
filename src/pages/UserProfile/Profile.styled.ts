import styled from 'styled-components'

export const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 50px;

  width: 100%;
  margin-top: 20px;
`

export const StyledWrapper = styled.div`
  display: flex;
  gap: 20px;
`

export const StyledAvatar = styled.img`
  width: 250px;
`

export const StyledProfile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
export const StyledButton = styled.button`
    max-width: 260px;
    border: 1px solid var(--color-border-input);
    border-radius: 8px;
    padding: 5px 0;
`