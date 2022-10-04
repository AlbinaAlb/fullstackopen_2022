import { BaseEntry, Entry, Gender, HealthCheckRating, NewPatient } from './types'
import { v1 as uuid } from 'uuid'

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const parseValue = (value: unknown): string => {
  if (!value || !isString(value)) {
    throw new Error(`Incorrect or missing ${value}`)
  }
  return value
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date)
  }
  return date
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param)
}

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender)
  }
  return gender
}

type Fields = {
  name: unknown
  ssn: unknown
  dateOfBirth: unknown
  occupation: unknown
  gender: unknown
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entries: any
}

export const toNewPatient = ({name, ssn, dateOfBirth, occupation, gender, entries}: Fields): NewPatient => {
  const newEntry: NewPatient = {
    name: parseValue(name),
    ssn: parseValue(ssn),
    dateOfBirth: parseDate(dateOfBirth),
    occupation: parseValue(occupation),
    gender: parseGender(gender),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    entries,
  }
  return newEntry
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseArrayValue = (data: any): string[] => {
  if (!data) {
    return []
  }

  if (!Array.isArray(data)) {
    throw new Error(`Incorrect data: ` + data)
  }

  data.forEach((code) => {
    if (!isString(code)) {
      throw new Error(`Incorrect data: ` + data)
    }
  })
  return data as string[]
}

  const isRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parseRating = (rating: any): HealthCheckRating => {
    if (!rating) {
      throw new Error(`Missing rating`)
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const ratingNumber: number = parseInt(rating)
    if (isNaN(ratingNumber) || !isRating(ratingNumber)) {
      throw new Error(
        `Incorrect rating number: ${Object.values(HealthCheckRating).join(
          ' | '
        )}`
      )
    }
    return ratingNumber
  }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (newEntry: any): Entry => {
  const baseEntry: BaseEntry = {
    id: uuid(),
    description: parseValue(newEntry.description),
    date: parseDate(newEntry.date),
    specialist: parseValue(newEntry.specialist),
    diagnosisCodes: parseArrayValue(newEntry.diagnosisCodes),
  }

  if (!newEntry.type || !isString(newEntry.type)) {
    throw new Error(`Missing or invalid entry type`)
  }

  switch (newEntry.type) {
    case 'HealthCheck':
      return {
        ...baseEntry,
        type: 'HealthCheck',
        healthCheckRating: parseRating(HealthCheckRating),
      }
    case 'Hospital':
      return {
        ...baseEntry,
        type: 'Hospital',
        discharge: {
          date: parseDate(newEntry.dischargeDate),
          criteria: parseValue(newEntry.dischargeCriteria),
        },
      }
    case 'OccupationalHealthcare':
      let sickLeave
      if (newEntry.sickLeaveStartDate && newEntry.sickLeaveEndDate) {
        newEntry.sickLeave = {
          startDate: parseDate(newEntry.sickLeaveStartDate),
          endDate: parseDate(newEntry.sickLeaveEndDate),
        }
      }
      return {
        ...baseEntry,
        type: 'OccupationalHealthcare',
        employerName: parseValue(newEntry.employerName),
        sickLeave,
      }

    default:
      throw new Error(`Incorrect entry type`)
  }
}

