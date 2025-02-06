import personService from "../service/persons";

const Persons = ({ persons, setPersons }) => {
  const onClickHandler = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      personService.removePerson(id).then((deletedPerson) => {
        setPersons(persons.filter((person) => person.id !== deletedPerson.id));
      });
    }
  };
  return persons.map((person) => (
    <div key={person.id}>
      {person.name} {person.number}
      <button onClick={() => onClickHandler(person.id)}>delete</button>
    </div>
  ));
};

export default Persons;
