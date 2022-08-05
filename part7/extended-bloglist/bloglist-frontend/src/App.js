import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Routes, Route, useMatch } from 'react-router-dom'
import { loggedUser } from './reducers/loginReducer'
import Users from './components/Users'
import { initializeUsers } from './reducers/userReducer'
import BlogList from './components/BlogList'
import User from './components/User'
import Blog from './components/Blog'
import Navigation from './components/Navigation'

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
          <Navigation />
          <h1>Blog app</h1>
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
