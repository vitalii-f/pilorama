import SignUp from '@/components/layout/ui/auth/SignUp'
import LoadingSpinner from '@/components/layout/ui/loading/LoadingSpinner'
import { RootState } from '@/store/store'
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
  const userData = useSelector((state: RootState) => state.userSlice)

  if (userData.status === 'loading') return <LoadingSpinner />

  return (
    <section className='w-full'>
      <StyledDiv>
        {userData.user ? (
          <h2 className='w-full text-3xl text-center'>Регистрация успешна!</h2>
        ) : (
          <>
            <SignUp />
            <p className='mt-4'>Есть учётная запись?</p>
            <p>
              <StyledLink to='/login'>Войти в учётную запись</StyledLink>
            </p>
          </>
        )}
      </StyledDiv>
    </section>
  )
}

export default SignUpPage
