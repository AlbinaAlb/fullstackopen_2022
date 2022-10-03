import { OccupationalHealthcareEntry } from "../types"
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'

const OccupationalHealthcareData: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <>
      <hr />
      <div>
        {entry.date} <HealthAndSafetyIcon /> {entry.employerName}
      </div>
      <div> {entry.description}</div>
      <div>diagnose by {entry.specialist}</div>
      <hr />
    </>
  )
}

export default OccupationalHealthcareData
