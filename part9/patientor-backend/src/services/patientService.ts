import patientData from '../../data/patientsData'
import { Patient, NonSensitivePatientData } from '../types'

const getPatients = (): Array<Patient> => {
  return patientData
}

const getNonSensisitivePatientsData = (): NonSensitivePatientData[] => {
  return patientData.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  }))
}

export default { getPatients, getNonSensisitivePatientsData }
