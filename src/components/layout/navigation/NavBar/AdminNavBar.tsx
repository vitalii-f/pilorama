import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const StyledNav = styled.nav`
  min-width: 200px;

  padding: 10px 0;
  padding-right: 5px;
  border-right: 2px solid white;

  @media (max-width: 900px) {
    border-right: unset;
    border-bottom: 2px solid white;
  }
`

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 100%;

  @media (max-width: 900px) {
    flex-direction: row;
    overflow: auto;
    scrollbar-width: thin;
  }
`
function AdminNavBar() {
  return (
    <StyledNav>
      <StyledUl>
        <li>
          <NavLink to='/admin/createNews'>Статьи</NavLink>
        </li>
        <li>
          <NavLink to='/admin/usersControl'>Пользователи</NavLink>
        </li>
        <li>
          <NavLink to='/admin/categorys'>Категории</NavLink>
        </li>
      </StyledUl>
    </StyledNav>
  )
}

export default AdminNavBar
