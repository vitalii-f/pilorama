import styled from 'styled-components'

interface StyledButtonProps {
  $colorType?: string
}

export const StyledBackdrop = styled.div`
  position: fixed;
  left: 0;
  top: 0;

  width: 100vw;
  height: 100vh;
  z-index: 45;
`

export const StyledMenu = styled.div`
  position: absolute;
  transform: translateX(-100%);

  background-color: var(--color-backdrop);
  padding: 10px 10px;
  border-radius: 5%;
  z-index: 50;
  width: fit-content;
`

export const StyledUl = styled.ul`
  position: relative;
  z-index: 55;

  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const StyledButton = styled.button<StyledButtonProps>`
  width: 100%;

  display: flex;
  gap: 5px;

  color: ${(props) =>
    props.$colorType === 'delete' ? 'var(--color-red-delete)' : null};

  padding: 2px;
  text-align: left;
  &:hover {
    outline: 1px solid white;
    border-radius: 3px;
  }
`