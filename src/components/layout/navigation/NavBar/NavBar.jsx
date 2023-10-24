import { Link, NavLink } from 'react-router-dom';
import logo from '/public/logo.svg'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Drawer, IconButton, ThemeProvider, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { theme } from 'src/utils/constants/theme';
import { useQuery } from '@tanstack/react-query';
import { setUser } from 'src/store/user/userSlice';
import SignOutButton from '../../ui/auth/SignOutButton';

const drawerWidth = 240;

function NavBar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const user = useSelector((state) => state.user.value)

    const dispatch = useDispatch()

    const { isSuccess } = useQuery(['getUser'], () => dispatch(setUser()))
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const menu = (
        <nav className='px-2 mobile-menu'>
          <Toolbar />
          <ul className='flex flex-col items-center justify-between gap-5'>
            <li className='w-full'><NavLink to='/'>Главна</NavLink></li>
            <li className='w-full'><NavLink to='/articles'>Статьи</NavLink></li>
            <li className='w-full'><NavLink to='/about'>О нас</NavLink></li>
            {user
                ? <li className='w-full'><NavLink to='/profile'>Личный кабинет</NavLink> </li>
                : <li className='w-full'><NavLink to='/login'>Авторизация</NavLink> </li>
            }
            {user && user?.userRoles.includes('admin') && <li className='w-full'><NavLink to='/admin'>Создать новость</NavLink></li>}
            {user && <li className='w-full'> <SignOutButton /> </li>}
          </ul>
        </nav>
    )
    if (isSuccess) return (
        <>  
            <ThemeProvider theme={theme}>
            <IconButton
                className='mobile-menu'
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: 'none' } }}
            >
                <MenuIcon color='secondary' />
            </IconButton>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { md: 'block', lg: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {menu}
            </Drawer>
            </ThemeProvider>
            
            <nav className='flex justify-between w-full pb-4 border-b-2 border-gray-300 border-solid header-nav'>
                <Link to='/'><img className='w-28' src={logo} alt="Logo"/></Link>
                <ul className='flex items-center justify-between gap-5 header-nav'>
                    <li><NavLink to='/'>Главна</NavLink></li>
                    <li><NavLink to='/articles'>Статьи</NavLink></li>
                    <li><NavLink to='/about'>О нас</NavLink></li>
                    {user
                        ? <li><NavLink to='/profile'>Личный кабинет</NavLink> </li>
                        : <li><NavLink to='/login'>Авторизация</NavLink> </li>
                    }
                    {user && user?.userRoles.includes('admin') && <li><NavLink to='/admin'>Создать новость</NavLink></li>}
                    {user && <SignOutButton />}
                </ul>
            </nav>
        </>
    )
}

export default NavBar