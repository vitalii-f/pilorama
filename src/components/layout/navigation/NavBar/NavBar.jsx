import { Link, NavLink } from 'react-router-dom';
import logo from '/public/logo.svg'
// import { useContext } from 'react';
// import { AuthContext } from '../../../../providers/AuthProvider';
// import LoginButton from '../../ui/auth/LogInButton';
// import LogoutButton from '../../ui/auth/LogOutButton';
// import { useAuth0 } from '@auth0/auth0-react';

const isModer = true;


function NavBar() {
    // const {user, setUser} = useContext(AuthContext)

    // const { isAuthenticated } = useAuth0();

    
    return (
        <>
            <nav className='flex justify-between w-full pb-4 border-b-2 border-gray-300 border-solid'>
                <Link to='/'><img className='w-28' src={logo} alt="Logo"/></Link>
                <ul className='flex items-center justify-between gap-5'>
                    <li><NavLink to='/'>Главна</NavLink></li>
                    <li><NavLink to='/articles'>Статьи</NavLink></li>
                    <li><NavLink to='/about'>О нас</NavLink></li>
                    
                    {/* {isAuthenticated
                    ? <>
                        <li><NavLink to='/profile'> Профиль </NavLink> </li>
                        <li><LogoutButton /></li>
                      </>
                    : <LoginButton />} */}

                    

                    {/* {user
                        ? <li><NavLink to='/account'>Личный кабинет</NavLink> </li>
                        : <li><NavLink to='/auth'>Авторизация</NavLink> </li>
                    } */}
                    
                    {isModer ? <li><NavLink to='/admin'>Создать новость</NavLink></li> : false}
                </ul>
            </nav>
        </>
    )
}

export default NavBar