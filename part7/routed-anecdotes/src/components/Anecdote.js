const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h3>{anecdote.content}</h3>
      <div>{anecdote.user}</div>
      <div>{`has ${anecdote.votes} votes`}</div>
    </div>
  )
}

export default Anecdote