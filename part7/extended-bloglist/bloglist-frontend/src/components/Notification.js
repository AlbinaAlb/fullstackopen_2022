import { Alert } from '@mui/material'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (notification === null) {
    return null
  }

  if (notification && notification.includes('error')) {
    return <Alert severity="error">{notification.substring(5)}</Alert>
  }

  return notification && <Alert severity="success">{notification}</Alert>
}

export default Notification
