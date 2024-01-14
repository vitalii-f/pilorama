import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('articles')
  }, [])

  return <div></div>
}

export default HomePage
