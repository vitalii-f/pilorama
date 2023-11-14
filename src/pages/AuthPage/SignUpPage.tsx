import SignUp from '@/components/layout/ui/auth/SignUp'
import { IUserState } from '@/utils/interfaces/user.interfaces'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledDiv = styled.div`
  max-width: 400px;
  margin: 0 auto;
`
const StyledLink = styled(Link)`
  color: var(--color-secondary);
`

function SignUpPage() {
  const user = useSelector((state: IUserState) => state.user.value)
  return (
    <section className='w-full'>
      <StyledDiv>
        {user ? (
          <h2 className='w-full text-3xl text-center'>Регистрация успешна!</h2>
        ) : (
          <>
            <SignUp />
            <p className='mt-4'>Есть учётная запись?</p>
            <p><StyledLink to='/login'>Войти в учётную запись</StyledLink></p>
          </>
        )}
      </StyledDiv>
    </section>
  )
}

export default SignUpPage
