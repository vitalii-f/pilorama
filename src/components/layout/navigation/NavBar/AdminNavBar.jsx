import { NavLink } from "react-router-dom"

function AdminNavBar() {
  return (
    <nav className='flex-shrink-0 border-2 border-solid w-60'>
        <ul className='flex flex-col gap-4 p-2'>
          <li className=''> <NavLink to='/admin/createNews'> Управление статьями </NavLink> </li>
          <li className=''> <NavLink to='/admin/usersControl'> Управление пользователями </NavLink> </li>
        </ul>
      </nav>
  )
}

export default AdminNavBar