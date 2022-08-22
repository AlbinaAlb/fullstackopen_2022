import patientData from '../../data/patientsData'
import { Patient, NonSensitivePatientData, NewPatient } from '../types'
import { v1 as uuid } from 'uuid'

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

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    ...entry,
  }
  patientData.push(newPatient)
  return newPatient
}

export default { getPatients, getNonSensisitivePatientsData, addPatient }
