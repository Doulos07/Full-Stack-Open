import { useState } from "react";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([{ id: 1, name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addNewPerson = (event) => {
    event.preventDefault();

    let isExist = persons.some((person) => person.name === newName);

    if (!isExist) {
      const newperson = {
        id: persons.length + 1,
        name: newName,
      };
      setPersons(persons.concat(newperson));
    } else {
      alert(`${newName} is already added to phonebook`);
    }

    setNewName("");
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name:
          <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>debug: {newName}</div>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => {
          return <Person key={person.id} person={person} />;
        })}
      </div>
    </div>
  );
};

export default App;
