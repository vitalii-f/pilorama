import { NavLink } from "react-router-dom"

function AdminNavBar() {
  return (
    <nav className='flex-shrink-0 w-60'>
        <ul className='flex flex-col gap-4 pt-2 pr-2'>
          <li className=''> <NavLink to='/admin/createNews'> Управление статьями </NavLink> </li>
          <li className=''> <NavLink to='/admin/usersControl'> Управление пользователями </NavLink> </li>
        </ul>
      </nav>
  )
}

export default AdminNavBar