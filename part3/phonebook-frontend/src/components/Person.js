const Person = ({ person, deletePerson }) => {
  return (
    <div>
      {person.name} {person.number}{' '}
      <button onClick={() => deletePerson(person.name, person.id)}>delete</button>
    </div>
  )
}
export default Person