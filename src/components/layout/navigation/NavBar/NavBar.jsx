import { Link, NavLink } from 'react-router-dom';
import logo from '/public/logo.svg'

const isModer = true;

function NavBar() {
    return (
        <>
            <nav className='flex justify-between w-full pb-4 border-b-2 border-gray-300 border-solid '>
                <Link to='/'><img className='w-28' src={logo} alt="Logo"/></Link>
                <ul className='flex items-center justify-between max-w-md gap-5'>
                    <li><NavLink to='/'>Главна</NavLink></li>
                    <li><NavLink to='/articles'>Статьи</NavLink></li>
                    <li><NavLink to='/about'>О нас</NavLink></li>
                    {isModer ? <li><NavLink to='/admin'>Создать новость</NavLink></li> : false}
                </ul>
            </nav>
        </>
    )
}

export default NavBar