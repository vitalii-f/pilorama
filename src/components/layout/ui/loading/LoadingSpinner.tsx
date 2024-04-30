import { CircularProgress } from '@mui/material'
import styled from 'styled-components'

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 5vh;

  padding-top: 5vh;
`

const StyledText = styled.span`
  text-transform: uppercase;
  font-weight: 500;
  font-size: 2rem;
`

const LoadingSpinner = () => {
  return (
    <StyledContainer>
      <CircularProgress
        size={'5rem'}
        sx={{ width: '110px', height: '110px', color: '#646cff' }}
      />
      <StyledText>Wait, loading...</StyledText>
    </StyledContainer>
  )
}

export default LoadingSpinner
