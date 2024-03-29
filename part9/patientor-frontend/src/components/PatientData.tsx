import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import { apiBaseUrl } from '../constants'
import {
  setPatientData,
  useStateValue,
  setDiagnosisList,
  addEntry,
} from '../state'
import { Patient, Entry, Diagnosis } from '../types'
import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'
import TransgenderIcon from '@mui/icons-material/Transgender'
import { Button } from '@mui/material'
import EntryDetails from './EntryDetails'
import AddEntryModal from '../AddEntryModal'
import { EntryFormValues } from '../AddEntryModal/AddEntryForm'
import {
  isHealthCheckEntry,
  isHospitalEntry,
  isOccupationalHealthcareEntry,
} from '../utils'

const PatientData = () => {
  const [{ patient, diagnosis }, dispatch] = useStateValue()
  const [modalOpen, setModalOpen] = React.useState<boolean>(false)

  const { id } = useParams<{ id: string }>()

  const openModal = (): void => setModalOpen(true)

  const closeModal = (): void => {
    setModalOpen(false)
  }

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientDataFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        )
        dispatch(setPatientData(patientDataFromApi))
      } catch (error) {
        console.log(error)
      }
    }

    const fetchDiagnosis = async () => {
      try {
        const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        )
        dispatch(setDiagnosisList(diagnosisListFromApi))
      } catch (error) {
        console.log(error)
      }
    }

    if (!patient || patient?.['id'] !== id) {
      void fetchPatient()
      void fetchDiagnosis()
    }
  }, [patient, id, dispatch])

  const genderIcon = () => {
    switch (patient?.gender) {
      case 'male':
        return <MaleIcon />
      case 'female':
        return <FemaleIcon />
      case 'other':
        return <TransgenderIcon />
      default:
        break
    }
  }

  const getEntryView = (entry: Entry) => {
    return (
      <div key={entry.id}>
        <EntryDetails entry={entry} />
        {entry.diagnosisCodes && (
          <>
            <h4>Diagnoses</h4>
            <ul>
              {entry.diagnosisCodes.map((code: string) => {
                return (
                  <li key={code}>
                    {code} {diagnosis[code]?.name}
                  </li>
                )
              })}
            </ul>
          </>
        )}
      </div>
    )
  }

  const totalEntries = patient ? patient?.entries?.length : 0

  const getEntryType = (values: EntryFormValues) => {
    let type
    if (isHealthCheckEntry(values)) {
      type = 'HealthCheck'
    } else if (isOccupationalHealthcareEntry(values)) {
      type = 'OccupationalHealthcare'
    } else if (isHospitalEntry(values)) {
      type = 'Hospital'
    }

    return type
  }

  const submitNewEntry = async (values: EntryFormValues) => {
    let entry
    const type = getEntryType(values)

    if (isOccupationalHealthcareEntry(values)) {
      if (
        values.sickLeave &&
        values.sickLeave.startDate !== '' &&
        values.sickLeave.endDate !== ''
      ) {
        entry = { ...values, type }
      } else {
        entry = { ...values, type, sickLeave: undefined }
      }
    } else if (isHospitalEntry(values)) {
      if (
        values.discharge &&
        values.discharge.date !== '' &&
        values.discharge.criteria !== ''
      ) {
        entry = { ...values, type }
      } else {
        entry = { ...values, type, discharge: undefined }
      }
    }

    try {
      const { data: NewEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        entry
      )
      dispatch(addEntry(NewEntry))
      patient && patient?.entries?.push(NewEntry)
      closeModal()
    } catch (error: any) {
      console.error(error.response.data)
    }
  }

  return (
    <div>
      <div>
        <h2>
          {patient?.name} {genderIcon()}
        </h2>
      </div>
      <div>ssn: {patient?.ssn}</div>
      <div>occupation: {patient?.occupation}</div>
      {!!totalEntries && (
        <>
          <h3>entries</h3>
          {patient?.entries?.map((entry) => getEntryView(entry))}
          <AddEntryModal
            modalOpen={modalOpen}
            onClose={closeModal}
            onSubmit={submitNewEntry}
          />
          <Button variant="contained" onClick={() => openModal()}>
            Add New Entry
          </Button>
        </>
      )}
    </div>
  )
}

export default PatientData
