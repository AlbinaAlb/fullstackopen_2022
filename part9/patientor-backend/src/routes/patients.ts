import express from 'express'
import patientService from '../services/patientService'
import { Entry, NewPatient } from '../types'
import { toNewPatient, toNewEntry } from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(patientService.getPatients())
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const patient = patientService.getPatientById(id)
  res.send(patient)
})

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient: NewPatient = toNewPatient(req.body)
    const addedPatient = patientService.addPatient(newPatient)
    res.json(addedPatient)
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`
    }
    res.status(400).send(errorMessage)
  }
})

router.post('/:id/entries', (req, res) => {
  const { id } = req.params
  try {
    const newEntry: Entry = toNewEntry(req.body)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
    const addedEntry = patientService.addEntry(id, newEntry)
    res.json(addedEntry)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Undefined error'
    res.status(400).send(errorMessage)
  }
  
})

export default router
