import LogIn from '@/components/layout/ui/auth/LogIn'
import LoadingSpinner from '@/components/layout/ui/loading/LoadingSpinner'
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

function LoginPage() {
  const user = useSelector((state: IUserState) => state.user.value)
  
  if (user === undefined) return <LoadingSpinner />
  
  return (
    <section className='w-full'>
      <StyledDiv>
        {user && user.userData ? (
          <h2 className='w-full text-3xl text-center'>Авторизация успешна!</h2>
        ) : (
          <>
            <LogIn />
            <p className='mt-4'>Новый пользователь?</p>
            <p><StyledLink to='/signup'>Зарегестрировать учётную запись</StyledLink></p>
          </>
        )}
      </StyledDiv>
    </section>
  )
}

export default LoginPage
