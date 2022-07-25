import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    try {
      if (name) {
        const getCountry = async () => {
          const res = await axios.get(
            `https://restcountries.com/v3.1/name/${name}?fullText=true`
          )
          setCountry(res.data[0])
        }
        getCountry()
      }
    } catch {
      setCountry(null)
    }
  }, [name])
  return country
}
