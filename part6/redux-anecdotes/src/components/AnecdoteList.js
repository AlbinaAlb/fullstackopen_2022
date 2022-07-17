import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  //компонент получает доступ к store. Функция выбирает данные из redux-store
  const anecdotes = useSelector((state) => state.anecdotes)
  //возвращает ссылку на dispatch функцию из store Redux, можно использовать его для отправки действий
  const dispatch = useDispatch()

  const handleVote = (id) => {
    dispatch(addVote(id))
  }
  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
