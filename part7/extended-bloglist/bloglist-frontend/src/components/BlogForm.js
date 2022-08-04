import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetUrl, ...url } = useField('text')

  const handleCreateBlog = async (event) => {
    try {
      event.preventDefault()

      const newBlog = {
        title: title.value,
        author: author.value,
        url: url.value,
      }

      resetTitle()
      resetAuthor()
      resetUrl()

      dispatch(addBlog(newBlog))
      dispatch(
        setNotification(
          `A new blog ${newBlog.title} by ${newBlog.author} added`,
          5
        )
      )
    } catch (error) {
      dispatch(setNotification('error ' + error.response.data.error, 5))
    }
  }

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title
          <input {...title} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url
          <input {...url} />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm
