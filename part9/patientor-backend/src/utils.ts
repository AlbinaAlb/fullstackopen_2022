import { Gender, NewPatient } from './types'

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
}

const toNewPatient = ({
  name,
  ssn,
  dateOfBirth,
  occupation,
  gender,
}: Fields): NewPatient => {
  const newEntry: NewPatient = {
    name: parseValue(name),
    ssn: parseValue(ssn),
    dateOfBirth: parseDate(dateOfBirth),
    occupation: parseValue(occupation),
    gender: parseGender(gender),
    entries: [],
  }
  return newEntry
}

export default toNewPatient
