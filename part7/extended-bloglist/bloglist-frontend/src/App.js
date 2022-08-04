import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { loggedUser, userLogout } from './reducers/loginReducer'
import Users from './components/Users'
import { initializeUsers } from './reducers/userReducer'
import BlogList from './components/BlogList'

const App = () => {
  const message = useSelector((state) => state.message)
  const user = useSelector((state) => state.login)
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loggedUser())
    dispatch(initializeUsers())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(userLogout())
  }

  return (
    <div>
      <h1>Blogs app</h1>
      <Notification message={message} />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <div>
            <span>{user.name} logged-in</span>
            <button onClick={handleLogout}>logout</button>
          </div>
          <BlogList />
          <Users users={users} />
        </div>
      )}
    </div>
  )
}

export default App
