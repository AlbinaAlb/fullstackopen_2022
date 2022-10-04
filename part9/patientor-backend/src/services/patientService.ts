import patientData from '../../data/patientsData'
import { Patient, PublicPatient, NewPatient, Entry } from '../types'
import { v1 as uuid } from 'uuid'

const getPatientById = (id: string): Patient | undefined => {
  let patient = patientData.find((patient) => patient.id === id)
  if (patient && !patient?.entries)
    patient = {
      ...patient,
      entries: [],
    }
  return patient
}

const getPatients = (): PublicPatient[] => {
  return patientData
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

const addEntry = (patientId: string, entry: Entry): Entry => {
  const patient: Patient | undefined = getPatientById(patientId)
  if (!patient) {
    throw new Error(`Incorrect patient id`)
  }
  patient.entries.push(entry)
  return entry
}

export default {
  getPatientById,
  getPatients,
  addPatient,
  addEntry,
}
