/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express'
import patientService from '../services/patientService'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensisitivePatientsData())
})

router.post('/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { name, ssn, dateOfBirth, occupation, gender } = req.body
  const newPatient = patientService.addPatient({
    name,
    ssn,
    dateOfBirth,
    occupation,
    gender,
  })
  res.json(newPatient)
})

export default router
