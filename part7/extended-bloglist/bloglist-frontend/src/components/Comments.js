import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { createComment } from '../reducers/blogReducer'

const Comments = ({ blog }) => {
  const dispatch = useDispatch()
  const { reset: resetComment, ...comment } = useField('text')

  const { id, comments } = blog

  const handleAddComment = (event) => {
    event.preventDefault()
    dispatch(createComment(id, comment.value))
    resetComment()
  }

  return (
    <div className="comments">
      <h3>comments</h3>
      <form onSubmit={handleAddComment}>
        <div>
          <input {...comment} />
        </div>
        <button type="submit">add comment</button>
      </form>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      ) : (
        <p>no comments yet...</p>
      )}
    </div>
  )
}

export default Comments
