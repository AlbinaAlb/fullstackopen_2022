import Person from "./Person"

const Persons = ({ persons, filter, deletePerson }) => {
  const filterName = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      {filterName.map((person) => (
        <Person person={person} key={person.id} deletePerson={deletePerson} />
      ))}
    </div>
  )
}

export default Persons