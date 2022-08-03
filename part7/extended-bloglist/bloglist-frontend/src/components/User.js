export const User = ({ user }) => (
  <tr>
    <td>{user.name}</td>
    <td>{user.blogs.length}</td>
  </tr>
)
