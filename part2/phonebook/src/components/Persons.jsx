const Person = ({ person, handle }) => {
  return (
    <li>
      {person.name} {person.number}
      <button value={person.id} onClick={handle}>
        Delete
      </button>
    </li>
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

export default Persons;
