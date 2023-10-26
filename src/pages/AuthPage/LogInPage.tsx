import LogIn from '@/components/layout/ui/auth/LogIn'
import { IUserState } from '@/utils/interfaces/interfaces'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledDiv = styled.div`
  max-width: 400px;
  margin: 0 auto;
`

function LoginPage() {
  const user = useSelector((state: IUserState) => state.user.value)
  return (
    <section className='w-full'>
      <StyledDiv>
        {user ? (
          <h2 className='w-full text-3xl text-center'>Авторизация успешна!</h2>
        ) : (
          <>
            <LogIn />
            <p className='mt-4'>Новый пользователь?</p>
            <p><Link to='/signup'>Зарегестрировать учётную запись</Link></p>
          </>
        )}
      </StyledDiv>
    </section>
  )
}

export default LoginPage
