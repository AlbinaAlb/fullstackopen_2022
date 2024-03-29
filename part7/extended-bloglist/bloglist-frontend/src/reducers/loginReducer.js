import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    login(state, action) {
      return action.payload
    },
    logout(state, action) {
      return action.payload
    },
  },
})

export const { setUser, login, logout } = loginSlice.actions

export const loggedUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export const userLogin = (credentials) => {
  return async (dispatch) => {
    const { username, password } = credentials
    try {
      const userLog = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(userLog))
      blogService.setToken(userLog.token)
      dispatch(login(userLog))
      dispatch(setNotification(`You are logged in as ${username}`, 5))
    } catch (error) {
      dispatch(setNotification('error ' + error.response.data.error, 5))
    }
  }
}

export const userLogout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logout(null))
  }
}

export default loginSlice.reducer
