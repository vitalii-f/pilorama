import { Link } from 'react-router-dom';
import logo from '/public/logo.svg'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Drawer, IconButton, ThemeProvider, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SignOutButton from '../../ui/auth/SignOutButton';
import { theme } from '@/utils/constants/theme';
import NavBarLoader from './NavBar.skeleton';
import { StlyedNavLink, StyledDesktopNav, StyledDesktopUl, StyledLogoText, StyledMobileLi, StyledMobileNav, StyledMobileUl } from './NavBar.styled';
import CottageIcon from '@mui/icons-material/Cottage';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { RootState } from '@/store/store';

const drawerWidth = 250;

function NavBar() {
const [mobileOpen, setMobileOpen] = useState(false);

const userData = useSelector((state: RootState) => state.userSlice)

const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
}

const mobileMenu = (
    <StyledMobileNav className='mobile-menu'>
        <Toolbar />

        <StyledLogoText>Pilorama-news</StyledLogoText>
        <Toolbar />
        
        <StyledMobileUl>
        <StyledMobileLi><CottageIcon /><StlyedNavLink to='/'>Главная</StlyedNavLink></StyledMobileLi>
        <StyledMobileLi><NewspaperIcon /><StlyedNavLink to='/articles'>Статьи</StlyedNavLink></StyledMobileLi>
        {userData.user
            ? <StyledMobileLi><AccountCircleIcon /><StlyedNavLink to='/profile'>Личный кабинет</StlyedNavLink></StyledMobileLi>
            : <StyledMobileLi><StlyedNavLink to='/login'>Авторизация</StlyedNavLink> </StyledMobileLi>
        }
        {userData.user && userData.user.role?.includes('admin') && <StyledMobileLi><AdminPanelSettingsIcon /><StlyedNavLink to='/admin'>Создать новость</StlyedNavLink></StyledMobileLi>}
        {userData.user && <StyledMobileLi><LogoutIcon /><SignOutButton /></StyledMobileLi>}
        
        </StyledMobileUl>
    </StyledMobileNav>
)
if (userData.status === 'loading') return <NavBarLoader />
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
                <li><StlyedNavLink to='/'>Главная</StlyedNavLink></li>
                <li><StlyedNavLink to='/articles'>Статьи</StlyedNavLink></li>
                {userData.user
                    ? <li><StlyedNavLink to='/profile'>Личный кабинет</StlyedNavLink> </li>
                    : <li><StlyedNavLink to='/login'>Авторизация</StlyedNavLink> </li>
                }
                {userData.user && userData.user.role && userData.user.role.includes('admin') && <li><StlyedNavLink to='/admin'>Создать новость</StlyedNavLink></li>}
                {userData.user && <SignOutButton />}
            </StyledDesktopUl>
        </StyledDesktopNav>
    </>
)
}

export default NavBar