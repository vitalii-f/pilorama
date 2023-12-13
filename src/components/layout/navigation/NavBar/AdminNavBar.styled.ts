import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const StyledNav = styled.nav`
  min-width: 200px;

  padding: 10px 0;
  padding-right: 5px;
  border-right: 2px solid white;

  @media (max-width: 900px) {
    border-right: unset;
    border-bottom: 2px solid white;
  }
`

export const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 100%;

  @media (max-width: 900px) {
    align-items: center;
    padding-bottom: 20px;
    flex-direction: row;
    overflow: auto;
    scrollbar-width: thin;

    &::-webkit-scrollbar {
      height: 2px;
    }
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--color-bg-scrollbar);
    }
  }
`

export const StlyedNavLink = styled(NavLink)`
  display: block;
  font-size: clamp(1.4rem, 2.5vw, 1.5rem);
  width: fit-content;
  transition: all 0.2s;
  line-height: 1;
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
