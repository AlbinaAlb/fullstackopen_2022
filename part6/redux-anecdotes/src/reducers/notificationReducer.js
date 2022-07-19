import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      state = action.payload
      return state
    },
    clearNotification(state, action) {
      state = initialState
      return state
    },
  },
})
export const { showNotification, clearNotification } = notificationSlice.actions


export const setNotification = (content, timer) => {
  return async dispatch => {
    window.clearTimeout(window.timeout)
    dispatch(showNotification(content))
    window.timeout = setTimeout(() => {
      dispatch(clearNotification())
    }, timer * 1000)
  }
}

export default notificationSlice.reducer
