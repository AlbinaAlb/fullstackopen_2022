import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { orderBy } from 'lodash'
import {
  showNotification,
  hideNotification,
} from '../reducers/notificationReducer'
const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  )
  const dispatch = useDispatch()

  const handleVote = (id) => {
    dispatch(addVote(id))
    const anecdote = anecdotes.find((anecdote) => anecdote.id === id)
    dispatch(showNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
  }

  const sortedAnecdotes = orderBy(anecdotes, ['votes'], ['desc'])

  return sortedAnecdotes
    .map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote.id)}>vote</button>
        </div>
      </div>
    ))
}
export default AnecdoteList
