import { useDispatch } from 'react-redux'
import { userLogin } from '../reducers/loginReducer'
import { useField } from '../hooks'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('text')

  const onSubmit = (event) => {
    event.preventDefault()
    try {
      const user = {
        username: username.value,
        password: password.value,
      }
      dispatch(userLogin(user))
      dispatch(setNotification(`You are logged in as ${user.username}`, 5))
    } catch (error) {
      dispatch(setNotification('error ' + error.response.data.error, 5))
    }
    resetUsername()
    resetPassword()
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={onSubmit}>
        <div>
          username
          <input {...username} />
        </div>
        <div>
          password
          <input {...password} />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
