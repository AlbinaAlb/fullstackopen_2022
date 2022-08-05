import { useDispatch } from 'react-redux'
import { deleteBlog, updateLikes } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Comments from './Comments'

const Blog = ({ blog, user }) => {
  if (!blog) return null
  const dispatch = useDispatch()

  const handleLike = () => {
    try {
      const blogToUpdate = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
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
      <h2 className="title">{blog.title} </h2>
      <div className="blog-details">
        <div className="url">{blog.url}</div>
        <div className="likes">
          {blog.likes} likes{' '}
          <button id="like-btn" onClick={handleLike}>
            like
          </button>
        </div>
        <span className="author">added by {blog.author} </span>
        {user.username === blog.user.username && (
          <button id="delete-btn" onClick={handleRemove}>
            remove
          </button>
        )}
        <Comments blog={blog} />
      </div>
    </div>
  )
}

export default Blog
