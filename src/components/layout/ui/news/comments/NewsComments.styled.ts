import styled from 'styled-components'
import SendIcon from '@mui/icons-material/Send'

export const StyledWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;

  padding: 30px 0;
`

export const StyledControl = styled.div`
  display: flex;
  gap: 20px;
`

export const StyledWriteComment = styled.div`
  display: flex;
  gap: 20px;
`
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

export const StyledSendText = styled.span`
  @media (max-width: 425px) {
    display: none;
  }
`

export const StyledSendIcon = styled(SendIcon)`
  && {
    display: none;
    @media (max-width: 425px) {
      display: block;
    }
  }
`

export const StyledComments = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const StyledComment = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`

export const StyledAvatar = styled.img`
  width: 36px;
  height: 36px;

  border-radius: 50%;
`
