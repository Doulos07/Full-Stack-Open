const Country = ({ name }) => {
  return <li>{name}</li>;
};

const Countrys = ({ countrys }) => {
  return (
    <div>
      {countrys.map((country) => (
        <Country key={country.ccn3} name={country.name.common} />
      ))}
    </div>
  );
};

export default Countrys;
