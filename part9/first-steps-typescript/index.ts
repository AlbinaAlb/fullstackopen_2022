import express = require('express')
import { calculateBmi } from './bmiCalculator'
import { calculateExercises } from './trainingCalculator'

const app = express()
app.use(express.json())

app.get('/', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const { weight, height } = req.query
  const validParameters: boolean =
    !isNaN(Number(height)) && !isNaN(Number(weight))
  const bmi = calculateBmi(Number(height), Number(weight))

  if (!validParameters || !weight || !height) {
    res.send({
      error: 'malformatted parameters',
    })
  }

  res.send({ weight, height, bmi })
})

app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target }: any = req.body

  if (target && daily_exercises) {
    const isArray: boolean = Array.isArray(daily_exercises)

    if (isArray) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      daily_exercises.some((exercise: number) => isNaN(Number(exercise)))
    } else {
      return res.status(400).json({ error: 'malformatted parameters' })
    }
  } else {
    return res.status(400).json({ error: 'parameters missing' })
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(target, daily_exercises)
  return res.json(result)
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
