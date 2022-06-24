import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personsService
      .getPersons()
      .then((initialPersons) => setPersons(initialPersons))
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null)
    }, 5000)
    return () => clearTimeout(timer)
  }, [message])

  const addPerson = (event) => {
    event.preventDefault()
    let newPerson = {
      name: newName,
      id: persons.length + 1,
      number: newNumber,
    }
    const currentName = persons.some((person) => person.name === newName)
    if (!currentName && newName !== '') {
      personsService
        .createPerson(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          setMessage(`Added ${newPerson.name} to phonebook`)
        })
        .catch((error) => setMessage(error.response.data.error))
    } else if (currentName && newNumber !== '') {
      const oldPerson = persons.find((person) => person.name === newName)
      const changedPerson = { ...oldPerson, number: newNumber }
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personsService
          .updatePerson(changedPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === returnedPerson.id ? returnedPerson : person
              )
            )
            setMessage(`Updated ${newPerson.name}'s number`)
          })
          .catch((error) => setMessage(error.response.data.error))
      }
    } else if (newName === '') return
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (name, id) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personsService
        .remove(id)
        .then(() => setPersons(persons.filter((person) => id !== person.id)))
    }
    return
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter value={filter} onChange={(e) => setFilter(e.target.value)} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        onChangeName={(e) => setNewName(e.target.value)}
        onChangeNumber={(e) => setNewNumber(e.target.value)}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

export default App
