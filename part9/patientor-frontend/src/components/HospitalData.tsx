import { HospitalEntry } from "../types"
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'

const HospitalData: React.FC<{entry: HospitalEntry}> = ({ entry }) => {
  return (
    <>
      <hr />
      <div>
        {entry.discharge.date} <LocalHospitalIcon />
      </div>
      <div> {entry.discharge.criteria}</div>
      <div>diagnose by {entry.specialist}</div>
      <hr />
    </>
  )
}

export default HospitalData