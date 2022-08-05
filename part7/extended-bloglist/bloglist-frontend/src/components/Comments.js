const Comments = ({ blog }) => {
  const { comments } = blog
  console.log(blog)

  return (
    <div className="comments">
      <h3>comments</h3>
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
