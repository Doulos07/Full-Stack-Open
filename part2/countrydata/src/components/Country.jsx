const Language = ({ language }) => <li>{language}</li>;

const Languages = ({ languages }) => {
  console.log(languages);
  return (
    <ul>
      {Object.entries(languages).map(([key, value]) => {
        console.log("key: " + key + "\n" + "value: " + value);
        return <Language key={key} language={value} />;
      })}
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
