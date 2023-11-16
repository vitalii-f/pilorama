import { Link, NavLink } from 'react-router-dom';
import logo from '/public/logo.svg'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Drawer, IconButton, ThemeProvider, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SignOutButton from '../../ui/auth/SignOutButton';
import { theme } from '@/utils/constants/theme';
import { IUserState } from '@/utils/interfaces/user.interfaces';
import NavBarLoader from './NavBar.skeleton';
import { StlyedNavLink, StyledDesktopNav, StyledDesktopUl, StyledLogoText, StyledMobileLi, StyledMobileNav, StyledMobileUl } from './NavBar.styled';

const drawerWidth = 250;

function NavBar() {
const [mobileOpen, setMobileOpen] = useState(false);

const user = useSelector((state: IUserState) => state.user.value)

const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
}

const mobileMenu = (
    <StyledMobileNav className='mobile-menu'>
        <Toolbar />

        <StyledLogoText>Pilorama-news</StyledLogoText>
        <Toolbar />
        
        <StyledMobileUl>
        <StyledMobileLi><StlyedNavLink to='/'>Главна</StlyedNavLink></StyledMobileLi>
        <StyledMobileLi><StlyedNavLink to='/articles'>Статьи</StlyedNavLink></StyledMobileLi>
        
        {user && user.userData
            ? <StyledMobileLi><StlyedNavLink to='/profile'>Личный кабинет</StlyedNavLink></StyledMobileLi>
            : <StyledMobileLi><StlyedNavLink to='/login'>Авторизация</StlyedNavLink> </StyledMobileLi>
        }
        {user && user.userRoles?.includes('admin') && <StyledMobileLi><StlyedNavLink to='/admin'>Создать новость</StlyedNavLink></StyledMobileLi>}
        {user && user.userData && <StyledMobileLi><SignOutButton /></StyledMobileLi>}
        
        </StyledMobileUl>
    </StyledMobileNav>
)
if (user === undefined) return <NavBarLoader />
return (
    <>  
        <ThemeProvider theme={theme}>
            <IconButton
                className='mobile-menu'
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: 'none', '@media (max-width: 900px)': {display: 'block'}}}
            >
                <MenuIcon color='primary' />
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
                {mobileMenu}
            </Drawer>
        </ThemeProvider>
        
        <StyledDesktopNav>
            <Link to='/'><img className='w-28' src={logo} alt="Logo"/></Link>
            <StyledDesktopUl>
                <li><StlyedNavLink to='/'>Главна</StlyedNavLink></li>
                <li><StlyedNavLink to='/articles'>Статьи</StlyedNavLink></li>
                {user && user.userData
                    ? <li><StlyedNavLink to='/profile'>Личный кабинет</StlyedNavLink> </li>
                    : <li><StlyedNavLink to='/login'>Авторизация</StlyedNavLink> </li>
                }
                {user && user.userRoles && user?.userRoles.includes('admin') && <li><StlyedNavLink to='/admin'>Создать новость</StlyedNavLink></li>}
                {user && user.userData && <SignOutButton />}
            </StyledDesktopUl>
        </StyledDesktopNav>
    </>
)
}

export default NavBar