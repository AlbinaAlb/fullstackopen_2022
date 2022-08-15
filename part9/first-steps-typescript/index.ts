import express = require('express')
import { calculateBmi } from './bmiCalculator'
const app = express()

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

  res.send({weight, height, bmi})
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
