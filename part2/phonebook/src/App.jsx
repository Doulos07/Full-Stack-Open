import { useState, useEffect, useEffectEvent } from "react";
import Person from "./components/Person";
import PersonService from "./services/persons";

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
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const hook = () => {
    console.log("saas");
    PersonService.getAll().then((response) => {
      console.log(response);
      setPersons(response);
    });
  };
  useEffect(hook, []);

  console.log("persons", persons);
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

      PersonService.create(newperson).then((response) => {
        setPersons(persons.concat(response));
      });
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
