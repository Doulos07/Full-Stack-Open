const Language = ({ language }) => <li>{language}</li>;

const Languages = ({ languages }) => {
  return (
    <ul>
      {Object.entries(languages).map(([key, value]) => (
        <Language key={key} language={value} />
      ))}
    </ul>
  );
};

const Country = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <Languages languages={country.languages} />
      <img src={country.flags.png} alt={country.flags.alt} />
    </>
  );
};

export default Country;
