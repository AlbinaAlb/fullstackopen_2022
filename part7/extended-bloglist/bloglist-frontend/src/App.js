import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  const message = useSelector((state) => state.message)
  const blogs = useSelector((state) => state.blogs)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatch(setNotification(`You are logged in as ${username}`, 5))
    } catch (error) {
      dispatch(setNotification('error ' + error.response.data.error, 5))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  /*   const updateLikes = async (id, blogToUpdate) => {
    try {
      const updateBlog = await blogService.update(id, blogToUpdate)
      const newBlogs = blogs.map((blog) => (blog.id === id ? updateBlog : blog))
      setBlogs(newBlogs)
      dispatch(setNotification(`You liked '${updateBlog.title}'`, 5))
    } catch (error) {
      dispatch(setNotification('error' + error.response.data.error, 5))
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      const updateBlog = blogs.filter((blog) => blog.id !== id)
      setBlogs(updateBlog)
      dispatch(setNotification('Blog removed', 5))
    } catch (error) {
      dispatch(setNotification('error' + error.response.data.error, 5))
    }
  } */

  const blogFormRef = useRef()

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={message} />
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <div>
            <span>{user.name} logged-in</span>
            <button onClick={handleLogout}>logout</button>
          </div>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm  />
          </Togglable>
          {[...blogs]
            .sort((a, b) => {
              return b.likes - a.likes
            })
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                /* updateLikes={updateLikes}
                deleteBlog={deleteBlog} */
                username={user.username}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
