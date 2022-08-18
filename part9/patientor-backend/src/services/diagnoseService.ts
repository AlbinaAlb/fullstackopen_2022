import diagnoseData from '../../data/diagnoseData'
import { Diagnose } from '../types'

const getDiagnoses = (): Array<Diagnose> => {
  return diagnoseData
}

export default { getDiagnoses }
