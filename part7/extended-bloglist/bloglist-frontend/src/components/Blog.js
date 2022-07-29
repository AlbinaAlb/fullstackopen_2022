import { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog, username }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  /*   const handleLike = () => {
    const blogToUpdate = {
      likes: blog.likes + 1,
    }
    updateLikes(blog.id, blogToUpdate)
  } */

  /*   const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  } */

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
          {/* <div className="likes">
            {blog.likes}{' '}
            <button id="like-btn" onClick={handleLike}>
              like
            </button>
          </div> */}
          <div>{blog.user.username}</div>
          {/* {username === blog.user.username && (
            <button id="delete-btn" onClick={handleRemove}>
              remove
            </button>
          )} */}
        </div>
      )}
    </div>
  )
}

export default Blog
