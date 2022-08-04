import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import { loggedUser, userLogout } from './reducers/loginReducer'
import Users from './components/Users'
import { initializeUsers } from './reducers/userReducer'
import BlogList from './components/BlogList'
import User from './components/User'
import Blog from './components/Blog'

const App = () => {
  const message = useSelector((state) => state.message)
  const user = useSelector((state) => state.login)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loggedUser())
    dispatch(initializeUsers())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(userLogout())
  }

  const padding = {
    padding: 5,
  }

  const matchUser = useMatch('/users/:id')
  const userId = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null

  const matchBlog = useMatch('/blogs/:id')
  const blogId = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null

  return (
    <div>
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <Link style={padding} to="/">
            Blogs
          </Link>
          <Link style={padding} to="/users">
            Users
          </Link>
          <h1>Blogs app</h1>
          <div>
            <span>{user.name} logged-in</span>{' '}
            <button onClick={handleLogout}>logout</button>
          </div>
          <Notification message={message} />
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route
              path="/blogs/:id"
              element={<Blog blog={blogId} user={user} />}
            />
            <Route path="/users" element={<Users users={users} />} />
            <Route path="/users/:id" element={<User user={userId} />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
