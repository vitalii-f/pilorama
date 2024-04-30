import ContentLoader from 'react-content-loader'

const NavBarLoader = () => (
  <ContentLoader
    speed={2}
    width={1200}
    height={130}
    viewBox='0 0 1200 130'
    backgroundColor='#aaaaaa'
    foregroundColor='#d6d6d6'
  >
    <circle cx='66' cy='69' r='56' />

    <rect x='1035' y='55' rx='8' ry='8' width='165' height='45' />
    <rect x='835' y='55' rx='8' ry='8' width='165' height='45' />
    <rect x='635' y='55' rx='8' ry='8' width='165' height='45' />
    <rect x='435' y='55' rx='8' ry='8' width='165' height='45' />
  </ContentLoader>
)

export default NavBarLoader
