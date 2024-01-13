import { NavLink } from "react-router-dom"
import styled from "styled-components"

export const StyledMobileNav = styled.nav`
    padding: 0 8px;
`

export const StyledMobileUl = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
`

export const StyledMobileLi = styled.li`
    display: flex;
    gap: 5px;
    align-items: center;
    width: 100%;
    & > button {
        width: 100%;
    }
`

export const StlyedNavLink = styled(NavLink)`
    display: block;
    font-size: clamp(1.4rem, 2.5vw, 1.5rem);
    line-height: 1;
    width: fit-content;
    transition: all 0.2s;
    &::after {
        content: '';
        display: block;
        width: 0;
        border-bottom: 2px solid var(--color-secondary);
        transition: all 0.2s;
    }
    &.active::after {
        content: '';
        display: block;
        width: 100%;
        border-bottom: 2px solid var(--color-secondary);
        border-radius: unset;
    }
    &.active {
        color: var(--color-secondary);
    }
`

export const StyledDesktopNav = styled.nav`
    display: flex;
    justify-content: space-between;

    width: 100%;
    padding-bottom: 16px;
    border-bottom: 2px solid grey;

    @media (max-width: 900px) {
        display: none;
        flex-direction: column;

        & ul {
            flex-direction: column;
        }
    }
`

export const StyledDesktopUl = styled.ul`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
`

export const StyledLogoText = styled.h2`
    font-size: 28px;
    font-weight: bold;
    text-transform: uppercase;
`

export const StyledLogo = styled.img`
    width: 120px;
`