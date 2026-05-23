import { useState } from "react";
import Person from "./components/Person";

const Filter = ({ filter, handleChange }) => {
  return (
    <div>
      <form>
        <div>
          filter shown with
          <input value={filter} onChange={handleChange} />
        </div>
      </form>
    </div>
  );
};

const PersonForm = ({
  onSubmit,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          name:
          <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number:
          <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => {
        return <Person key={person.id} person={person} />;
      })}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const dataList = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  const addNewPerson = (event) => {
    event.preventDefault();

    let isExist = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase(),
    );

    if (!isExist) {
      const newperson = {
        id: persons.length + 1,
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(newperson));
    } else {
      alert(`${newName} is already added to phonebook`);
    }

    setNewName("");
    setNewNumber("");
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addNewPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h3>Numbers</h3>
      <Persons persons={dataList} />
    </div>
  );
};

export default App;
