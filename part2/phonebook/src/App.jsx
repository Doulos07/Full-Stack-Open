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

const Persons = ({ persons, handle }) => {
  return (
    <div>
      {persons.map((person) => {
        return <Person key={person.id} person={person} handle={handle} />;
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
    PersonService.getAll().then((response) => {
      setPersons(response);
    });
  };
  useEffect(hook, []);

  const dataList = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  const addNewPerson = (event) => {
    event.preventDefault();

    let isExist = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase(),
    );

    if (!isExist) {
      const newperson = {
        name: newName,
        number: newNumber,
      };

      PersonService.create(newperson).then((response) => {
        setPersons(persons.concat(response));
      });
    } else {
      const message =
        "is already added to phonebook, replace the old number with a new one?";
      const response = window.confirm(`${isExist.name} ${message}`);
      if (response) {
        const updatePerson = { ...isExist, number: newNumber };
        PersonService.update(isExist.id, updatePerson).then((response) =>
          setPersons(
            persons.map((person) =>
              person.id !== isExist.id ? person : updatePerson,
            ),
          ),
        );
      }
    }

    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (event) => {
    const person = persons.find((person) => person.id === event.target.value);
    const message = `Delete ${person.name} ?`;
    const response = window.confirm(message);
    if (response) {
      PersonService.deletePerson(person.id).then((response) => {
        setPersons(persons.filter((person) => person.id !== response.id));
      });
    }
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
      <Persons persons={dataList} handle={handleDelete} />
    </div>
  );
};

export default App;
