import diagnoseData from '../../data/diagnoseData'
import { Diagnosis } from '../types'

const getDiagnoses = (): Array<Diagnosis> => {
  return diagnoseData
}

export default { getDiagnoses }
