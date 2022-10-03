import { Entry } from "../types";
import HealthCheckData from "./HealthCheckData";
import HospitalData from "./HospitalData";
import OccupationalHealthcareData from "./OccupationalHealthcareData";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const EntryDetails: React.FC<{entry: Entry}> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalData entry={entry} />
     case 'HealthCheck':
      return <HealthCheckData entry={entry} />
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareData entry={entry} /> 

    default:
      return assertNever(entry)
  }
}

export default EntryDetails