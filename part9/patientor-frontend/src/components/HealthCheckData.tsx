import { HealthCheckEntry, HealthCheckRating } from '../types'
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation'
import FavoriteIcon from '@mui/icons-material/Favorite'

const HealthCheckData: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const heartColor = (rating: HealthCheckRating) => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return 'success'
      case HealthCheckRating.LowRisk:
        return 'primary'
      case HealthCheckRating.HighRisk:
        return 'secondary'
      case HealthCheckRating.CriticalRisk:
        return 'error'

      default:
        break
    }
  }
  return (
    <>
      <hr />
      <div>
        {entry.date} <MedicalInformationIcon />
      </div>
      <div> {entry.description}</div>
      <FavoriteIcon color={heartColor(entry.healthCheckRating)} />
      <div>diagnose by {entry.specialist}</div>
      <hr />
    </>
  )
}

export default HealthCheckData
