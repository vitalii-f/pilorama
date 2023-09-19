import { Link, NavLink } from 'react-router-dom';
import logo from '/public/logo.svg'
import SignOutButton from '../../ui/auth/SignOutButton';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function NavBar() {
    const [admin, setAdmin] = useState(false)
    
    const user = useSelector((state) => state.user.value)

    useEffect(() => {
        user?.role.then(data => setAdmin(data.includes('admin')))
    }, [user])
    
    return (
        <>
            <nav className='flex justify-between w-full pb-4 border-b-2 border-gray-300 border-solid'>
                <Link to='/'><img className='w-28' src={logo} alt="Logo"/></Link>
                <ul className='flex items-center justify-between gap-5'>
                    <li><NavLink to='/'>Главна</NavLink></li>
                    <li><NavLink to='/articles'>Статьи</NavLink></li>
                    <li><NavLink to='/about'>О нас</NavLink></li>
                    {user
                        ? <li><NavLink to='/profile'>Личный кабинет</NavLink> </li>
                        : <li><NavLink to='/auth'>Авторизация</NavLink> </li>
                    }
                    {user && admin && <li><NavLink to='/admin'>Создать новость</NavLink></li>}
                    {user && <SignOutButton />}
                </ul>
            </nav>
        </>
    )
}

export default NavBar