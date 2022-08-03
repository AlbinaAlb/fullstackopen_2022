import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { loggedUser, userLogout } from './reducers/loginReducer'

const App = () => {
  const message = useSelector((state) => state.message)
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.login)

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(loggedUser())
  }, [dispatch])

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
