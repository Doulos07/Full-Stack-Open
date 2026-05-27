import Languages from "./Languages";
import Meteorological from "./meteorological";

const Country = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <Languages languages={country.languages} />
      <img src={country.flags.png} alt={country.flags.alt} />
      <Meteorological latlon={country.capitalInfo.latlng} />
    </>
  );
};

export default Country;
