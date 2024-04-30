import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AdminNavBar from '@/components/layout/navigation/NavBar/AdminNavBar'
import ErrorPage from '../ErrorPage/ErrorPage'
import LoadingSpinner from '@/components/layout/ui/loading/LoadingSpinner'
import { RootState } from '@/store/store'
import { StyledDivWrapper, StyledSection } from './AdminPanel.styled'

const AdminPanel = () => {
  const userData = useSelector((state: RootState) => state.userSlice)

  if (userData.status === 'loading') return <LoadingSpinner />
  if (!userData.user || !userData.role || !userData.role.includes('admin'))
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
