const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

app.use(express.json())
//3.8
morgan.token('data', function (req, res) {
  return req.method === 'POST' ? JSON.stringify(request.body) : ' '
})
//3.7
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cors())

const personsLength = persons.length
const date = new Date()

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find((person) => person.id == id)
  if (!person) {
    return response.status(404).end()
  }
  response.json(person)
})

app.get('/info', (request, response) => {
  response.send(
    `<p>Phonebook has info for ${personsLength} people</p><p>${date}</p>`
  )
})

const generateId = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  let persFilter = persons.filter((p) => p.name === body.name)

  const respError = (err, statusCode) => {
    return response.status(statusCode).json({
      error: err,
    })
  }

  if (!body.name) {
    respError('name must be unique', 400)
  } else if (!body.number) {
    respError('number must be unique', 400)
  } else if (persFilter.length > 0) {
    respError('name already exists in the phonebook', 400)
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(persons.length + 1, 10),
  }

  persons = persons.concat(person)
  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
