import { StyledNav, StyledUl } from './AdminNavBar.styled'
import { StlyedNavLink } from './NavBar.styled'

function AdminNavBar() {
  return (
    <StyledNav>
      <StyledUl>
        <li>
          <StlyedNavLink to='/admin/createNews'>Статьи</StlyedNavLink>
        </li>
        <li>
          <StlyedNavLink to='/admin/usersControl'>Пользователи</StlyedNavLink>
        </li>
        <li>
          <StlyedNavLink to='/admin/categories'>Категории</StlyedNavLink>
        </li>
        <li>
          <StlyedNavLink to='/admin/reports'>Жалобы</StlyedNavLink>
        </li>
      </StyledUl>
    </StyledNav>
  )
}

export default AdminNavBar
