//import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
  //const dispatch = useDispatch()

  const handleCreateAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    /* dispatch(createAnecdote(content))
    dispatch(setNotification(`New anecdote ${content} created`, 10)) */
    props.createAnecdote(content)
    props.setNotification(`New anecdote ${content} created`, 10)
  }
  return (
    <div>
      <h2>create new anecdote</h2>
      <form onSubmit={handleCreateAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
}

const ConnectedAnecdotes = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdotes
