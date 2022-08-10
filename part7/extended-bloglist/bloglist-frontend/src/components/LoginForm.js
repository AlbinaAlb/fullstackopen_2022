import { useDispatch } from 'react-redux'
import { userLogin } from '../reducers/loginReducer'
import { useField } from '../hooks'
import { Form, Button } from 'react-bootstrap'
import Notification from './Notification'

const LoginForm = () => {
  const dispatch = useDispatch()
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')

  const onSubmit = (event) => {
    event.preventDefault()
    const user = {
      username: username.value,
      password: password.value,
    }
    dispatch(userLogin(user))
    resetUsername()
    resetPassword()
  }

  return (
    <div>
      <Notification />
      <h2>Login to application</h2>
      <Form onSubmit={onSubmit} className="form-group col-md-4 col-sm-4">
        <Form.Group>
          <div className="form-outline mb-2">
            username:
            <input id="form2Example1" className="form-control" {...username} />
          </div>
          <div className="form-outline mb-4">
            password:
            <input id="form2Example2" className="form-control" {...password} />
          </div>
          <Button variant="secondary" id="login-button" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm
