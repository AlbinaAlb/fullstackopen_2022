import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }
  const handleCreateBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog.title, newBlog.author, newBlog.url)
    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title
          <input
            name="title"
            type="text"
            value={newBlog.title}
            onChange={handleInputChange}
            placeholder="title"
          />
        </div>
        <div>
          author
          <input
            name="author"
            type="text"
            value={newBlog.author}
            onChange={handleInputChange}
            placeholder="author"
          />
        </div>
        <div>
          url
          <input
            name="url"
            type="text"
            value={newBlog.url}
            onChange={handleInputChange}
            placeholder="url"
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm
