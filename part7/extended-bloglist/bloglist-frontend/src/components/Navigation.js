import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userLogout } from '../reducers/loginReducer'

const padding = { padding: 5 }

const Navigation = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector((state) => state.login)

  const handleLogout = () => {
    dispatch(userLogout())
    navigate('/')
  }

  return (
    <div>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      <span>{currentUser.name} logged-in</span>{' '}
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Navigation
