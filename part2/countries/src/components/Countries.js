const Countries = ({ countriesFilter, onShow }) => {
  if (countriesFilter.length === 1) return null
  return (
    <div>
      {countriesFilter.map((country) => (
        <div key={country.name.official}>
          {country.name.common}{' '}
          <button onClick={() => onShow(country.name.common)}>show</button>
        </div>
      ))}
    </div>
  )
}

export default Countries
