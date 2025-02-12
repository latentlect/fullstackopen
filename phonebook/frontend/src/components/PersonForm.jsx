import { useState } from "react";
import personService from "../service/persons";
import Notification from "./Notfification";

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [promptMessage, setPromptMessage] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };

    const personExits = persons.some((person) => person.name === newName);
    const updatedNumber = persons.some((person) => person.number !== newNumber);

    if (personExits && updatedNumber) {
      const userResponse = window.confirm(
        `${newName} is already added to phonebook, replace the old one with a new one?`
      );
      if (userResponse) {
        const oldPerson = persons.find((person) => person.name === newName);
        const updatedPerson = {
          ...oldPerson,
          number: newNumber,
        };
        personService
          .update(oldPerson.id, updatedPerson)
          .then((returnedPerson) =>
            setPersons(
              persons.map((person) =>
                person.id === returnedPerson.id ? returnedPerson : person
              )
            )
          )
          .catch((error) => {
            setPromptMessage(error.response.data.error);
            setNewName("");
            setNewNumber("");
            setTimeout(() => {
              setPromptMessage("");
            }, 5000);
          });
      }
    } else if (personExits) {
      alert(`${newName} is already added to phonebook`);
      return;
    } else {
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          setPromptMessage(`Added ${newName}`);
        })
        .catch((error) => {
          setPromptMessage(error.response.data.error);
          setNewName("");
          setNewNumber("");
          console.log(error.response.data.error);
          setTimeout(() => {
            setPromptMessage("");
          }, 5000);
        });
    }
  };

  const onNewNameHandler = (event) => {
    setNewName(event.target.value);
  };

  const onNewNumberHandler = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={onNewNameHandler} />
        </div>
        <div>
          phone: <input onChange={onNewNumberHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        <Notification prompt={promptMessage} />
      </form>
    </div>
  );
};

export default PersonForm;
