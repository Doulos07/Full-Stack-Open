const Country = ({ name, handle }) => {
  return (
    <>
      <li>
        {name}
        <button value={name} onClick={handle}>
          show
        </button>
      </li>
    </>
  );
};

const Countrys = ({ countrys, handle }) => {
  return (
    <div>
      {countrys.map((country) => (
        <Country
          key={country.ccn3}
          name={country.name.common}
          handle={handle}
        />
      ))}
    </div>
  );
};

export default Countrys;
