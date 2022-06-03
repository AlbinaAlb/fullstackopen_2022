import Person from "./Person"

const Persons = ({ persons, filter }) => {
  const filterName = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      {filterName.map((person) => (
        <Person person={person} key={person.id} />
      ))}
    </div>
  )
}

export default Persons