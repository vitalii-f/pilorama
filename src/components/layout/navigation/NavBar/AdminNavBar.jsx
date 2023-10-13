import { NavLink } from "react-router-dom"
import styled from "styled-components"

const StyledNavLink = styled(NavLink)`
  
`

function AdminNavBar() {
  return (
    <nav className='flex-shrink-0 w-60'>
        <ul className='flex flex-col gap-4 pt-2 pr-2'>
          <li className=''> <StyledNavLink to='/admin/createNews'> Управление статьями </StyledNavLink> </li>
          <li className=''> <StyledNavLink to='/admin/usersControl'> Управление пользователями </StyledNavLink> </li>
        </ul>
      </nav>
  )
}

export default AdminNavBar