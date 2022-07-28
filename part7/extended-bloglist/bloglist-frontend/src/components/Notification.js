import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification === null) {
    return null
  }

  if (notification.includes('error')) {
    return <div className="error">{notification.substring(5)}</div>
  }

  return notification && <div className="success">{notification}</div>
}

export default Notification
