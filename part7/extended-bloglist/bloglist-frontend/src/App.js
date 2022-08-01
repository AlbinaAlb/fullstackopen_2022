import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { userLogout } from './reducers/loginReducer'

const App = () => {
  const message = useSelector((state) => state.message)
  const blogs = useSelector((state) => state.blogs)
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    dispatch(userLogout())
  }

  const blogFormRef = useRef()

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={message} />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <div>
            <span>{user.name} logged-in</span>
            <button onClick={handleLogout}>logout</button>
          </div>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          {[...blogs]
            .sort((a, b) => {
              return b.likes - a.likes
            })
            .map((blog) => (
              <Blog key={blog.id} blog={blog} username={user.username} />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
