import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import PersonService from "./services/persons";
import Filter from "./components/Filter";

const confirmAction = (message) => {
  return window.confirm(`${message}`);
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    PersonService.getAll().then((response) => setPersons(response));
  }, []);

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
      const message = ` ${isExist.name} is already added to phonebook, replace the old number with a new one?`;
      if (confirmAction(message)) {
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
    if (confirmAction(`Delete ${person.name} ?`)) {
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
