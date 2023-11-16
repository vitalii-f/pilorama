import { FirebaseAuthService } from '@/services/firebaseAuth.service'
import { useAppDispatch } from '@/store/store'
import { signOutUser } from '@/store/user/userSlice'
import styled from 'styled-components'

const StyledButton = styled.button`
  color: var(--color-red-delete);
  text-align: start;

  font-size: clamp(1rem, 2.5vw, 1.5rem);
  transition: all 0.2s;
  &.active::after {
    content: '';
    display: block;
    width: 100%;
    border-bottom: 2px solid var(--color-secondary);
    border-radius: unset;
  }
  &:hover {
    text-shadow: 0px 0px 8px rgba(238, 32, 76, 0.75);
  }
`

function SignOutButton() {
  const dispatch = useAppDispatch()
  return (
    <>
      <StyledButton
        onClick={() => {
          FirebaseAuthService.signOutUser()
          dispatch(signOutUser())
        }}
      >
        Выйти
      </StyledButton>
    </>
  )
}

export default SignOutButton
