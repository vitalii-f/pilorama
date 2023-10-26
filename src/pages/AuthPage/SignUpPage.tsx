import SignUp from '@/components/layout/ui/auth/SignUp'
import { IUserState } from '@/utils/interfaces/interfaces'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledDiv = styled.div`
  max-width: 400px;
  margin: 0 auto;
`

function SignUpPage() {
  const user = useSelector((state: IUserState) => state.user.value)
  return <section className='w-full'>
    <StyledDiv> 
      {user ? <h2 className="w-full text-3xl text-center"> Авторизация успешна! </h2> : <SignUp />}
      <p className='mt-4'>Есть учётная запись?</p>
      <p><Link to='/login'>Войти в учётную запись</Link></p>
    </StyledDiv>
  </section>
}

export default SignUpPage
