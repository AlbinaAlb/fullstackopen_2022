const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, post) => sum + post.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const favorite = blogs.reduce((prev, curr) =>
    prev.likes > curr.likes ? prev : curr
  )

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
}

const mostBlogs = (blogs) => {
  //{ 'Michael Chan': 1, 'Edsger W. Dijkstra': 2, 'Robert C. Martin': 3 }
  const authorCount = blogs.reduce((prev, curr) => {
    if (curr.author in prev) {
      return {
        ...prev,
        [curr.author]: prev[curr.author] + 1,
      }
    }
    const newValue = { ...prev, [curr.author]: 1 }
    return newValue
  }, {})
  //topAuthor = Object.keys(authorCount) делает массив из ключей [ 'Michael Chan', 'Edsger W. Dijkstra', 'Robert C. Martin' ]
  const topAuthor = Object.keys(authorCount).reduce((prev, curr) => {
    return authorCount[prev] > authorCount[curr] ? prev : curr
  })
  return {
    author: topAuthor,
    blogs: authorCount[topAuthor],
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  const likesCount = blogs.reduce((prev, curr) => {
    if (curr.author in prev) {
      return {
        ...prev,
        [curr.author]: prev[curr.author] + curr.likes,
      }
    }

    const newValue = { ...prev, [curr.author]: curr.likes }
    return newValue
  }, {})
  const topAuthor = Object.keys(likesCount).reduce((prev, curr) => {
    return likesCount[prev] > likesCount[curr] ? prev : curr
  })

  return {
    author: topAuthor,
    likes: likesCount[topAuthor],
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
