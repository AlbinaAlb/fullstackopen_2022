import axios from 'axios'

const baseUrl = 'https://fierce-hollows-37652.herokuapp.com/api/persons'

const getPersons =  () => {
  const request = axios.get(baseUrl)
  return request.then(response =>response.data)
}

const createPerson = newPerson => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(response => response.data)
}

const updatePerson = (id, changedPerson) =>{
  const request = axios.put(`${baseUrl}/${id}`, changedPerson)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((response) => response)
}

const personsService = {
  getPersons,
  createPerson,
  updatePerson,
  remove,
}
  export default personsService