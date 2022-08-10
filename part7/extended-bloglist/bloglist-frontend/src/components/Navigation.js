import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userLogout } from '../reducers/loginReducer'
import { Navbar, Nav } from 'react-bootstrap'

const padding = { padding: 5 }

const Navigation = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector((state) => state.login)

  const handleLogout = () => {
    dispatch(userLogout())
    navigate('/')
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" as="span">
            <Link className="text-reset text-secondary" style={padding} to="/">
              blogs
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link
              className="text-reset text-secondary"
              style={padding}
              to="/users"
            >
              users
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {currentUser && (
              <>
                <span>{currentUser.name} logged-in </span>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleLogout}
                >
                  logout
                </button>
              </>
            )}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
