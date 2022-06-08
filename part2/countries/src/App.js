import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [selectedCountries, setSelectedCountries] = useState('')
  
  const countriesFilter = countries.filter((country) =>
    country.name.common.toLowerCase().includes(selectedCountries.toLowerCase())
  )
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data)
    })
  }, [])


  return (
    <div>
      <p>
        find countries{' '}
        <input
          value={selectedCountries}
          onChange={(e) => setSelectedCountries(e.target.value)}
          type="text"
        />
      </p>
      {countriesFilter.length === 1 ? (
        <Country country={countriesFilter[0]} />
      ) : null}
      {countriesFilter.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : (
        <Countries
          countriesFilter={countriesFilter}
          onShow={(country) => {
            setSelectedCountries(country)}
          }
        />
      )}
    </div>
  )
}

export default App
