import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AdminNavBar from '@/components/layout/navigation/NavBar/AdminNavBar'
import ErrorPage from '../ErrorPage/ErrorPage'
import styled from 'styled-components'
import LoadingSpinner from '@/components/layout/ui/loading/LoadingSpinner'
import { RootState } from '@/store/store'

const StyledDivWrapper = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`

const StyledSection = styled.section`
  width: 100%;
  min-height: 100vh;
  padding: 10px 5px;
`

function AdminPanel() {
  const userData = useSelector((state: RootState) => state.userSlice)

  if (userData.status === 'loading') return <LoadingSpinner />
  if (!userData.user || !userData.user.role || !userData.user.role.includes('admin'))
    return <ErrorPage errorCode={'403 - отказано в доступе'} />

  return (
    <StyledDivWrapper>
      <AdminNavBar />
      <StyledSection>
        <Outlet />
      </StyledSection>
    </StyledDivWrapper>
  )
}

export default AdminPanel
