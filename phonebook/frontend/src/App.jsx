import { useEffect, useState } from "react";
import personService from "./service/persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personService.getAll().then((returnedPersons) => {
      setPersons(returnedPersons);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} />
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons}/>
    </div>
  );
};

export default App;
