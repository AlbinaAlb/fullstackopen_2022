import { HealthCheckEntry, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry } from "./types"

export const isHealthCheckEntry = (values: any): values is HealthCheckEntry => {
  return (
    values.healthCheckRating === HealthCheckRating.LowRisk ||
    values.healthCheckRating === HealthCheckRating.Healthy ||
    values.healthCheckRating === HealthCheckRating.HighRisk ||
    values.healthCheckRating === HealthCheckRating.CriticalRisk
  )
}

export const isOccupationalHealthcareEntry = (
  values: any
): values is OccupationalHealthcareEntry => {
  return values.employerName && values.employerName !== ''
}

export const isHospitalEntry = (values: any): values is HospitalEntry => {
  if (
    !values.healthCheckRating ||
    values.healthCheckRating !== 0 ||
    !values.employerName ||
    values.employerName === ''
  ) {
    return true
  }
  return false
}