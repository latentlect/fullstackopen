import { useState } from "react";

const Filter = ({ persons }) => {
  const [searchPerson, setSearchPerson] = useState({});

  const onSearchHandler = (event) => {
    const result = persons.find(
      (person) =>
        person.name.trim().toLowerCase() ===
        event.target.value.trim().toLowerCase()
    );
    if (result) {
      setSearchPerson(result);
      console.log(result);
    }
  };

  return (
    <div>
      search: <input onChange={onSearchHandler} />
      <div>
        {searchPerson.name} {searchPerson.number}
      </div>
    </div>
  );
};

export default Filter;
