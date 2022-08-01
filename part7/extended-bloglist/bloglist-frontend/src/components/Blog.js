import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, updateLikes } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, username }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    try {
      const blogToUpdate = {
        likes: blog.likes + 1,
      }
      dispatch(updateLikes(blog.id, blogToUpdate))
      dispatch(setNotification(`You liked '${blog.title}'`, 5))
    } catch (error) {
      dispatch(setNotification('error' + error.response.data.error, 5))
    }
  }

  const handleRemove = () => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        dispatch(deleteBlog(blog.id))
        dispatch(setNotification('Blog removed', 5))
      }
    } catch (error) {
      dispatch(setNotification('error' + error.response.data.error, 5))
    }
  }

  return (
    <div className="blog">
      <div>
        <span className="title">{blog.title} </span>
        <span className="author">{blog.author} </span>
        <button id="view-btn" onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>

      {visible && (
        <div className="blog-details">
          <div className="url">{blog.url}</div>
          <div className="likes">
            {blog.likes}{' '}
            <button id="like-btn" onClick={handleLike}>
              like
            </button>
          </div>
          <div>{blog.user.username}</div>
          {username === blog.user.username && (
            <button id="delete-btn" onClick={handleRemove}>
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
