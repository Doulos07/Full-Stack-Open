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

export default Person;
