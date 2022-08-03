import { User } from './User'

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      {users && (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Users
