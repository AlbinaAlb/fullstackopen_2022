import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null)
    }, 5000)
    return () => {
      clearTimeout(timer)
    }
  }, [message])
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async ( username, password ) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setMessage(`You are logged in as ${username}`)
    } catch (exception) {
       setMessage('error ' + exception.response.data.error)
    }
  }

   const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  } 

  const createBlog = async (title, author, url) => {
    //Теперь мы можем скрыть форму из родительского компонента
    blogFormRef.current.toggleVisibility()
    try {
      const blog = await blogService.create({
        title,
        author,
        url,
      })
      setBlogs(blogs.concat(blog))
      setMessage(`A new blog ${title} by ${author} added`)
    } catch (exception) {
      setMessage('error ' + exception.response.data.error)
    }
  }

   const updateLikes = async (id, blogToUpdate) => {
     try {
       const updateBlog = await blogService.update(id, blogToUpdate)
       const newBlogs = blogs.map(blog => blog.id === id ? updateBlog : blog )
       setBlogs(newBlogs)
     } catch (exception) {
       setMessage('error' + exception.response.data.error)
     }
   } 

   const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      const updateBlog = blogs.filter(blog => blog.id !== id)
      setBlogs(updateBlog)
      setMessage('Blog removed')
    } catch (exception) {
       setMessage('error' + exception.response.data.error)
    }
   }

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
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateLikes={updateLikes}
                deleteBlog={deleteBlog}
                username={user.username}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
