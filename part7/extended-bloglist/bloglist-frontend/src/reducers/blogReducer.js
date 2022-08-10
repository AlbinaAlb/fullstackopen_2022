import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      const { id } = updatedBlog
      return state.map((blog) => (blog.id !== id ? blog : updatedBlog))
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
  },
})

export const { appendBlog, setBlogs, updateBlog, removeBlog } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
  }
}

export const updateLikes = (id, blogToUpdate) => {
  return async (dispatch) => {
    const updateLikes = await blogService.addLike(id, blogToUpdate)
    dispatch(updateBlog(updateLikes))
  }
}

export const createComment = (id, comment) => {
  return async (dispatch) => {
    const commentedBlog = await blogService.addComment(id, comment)
    dispatch(updateBlog(commentedBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export default blogSlice.reducer
