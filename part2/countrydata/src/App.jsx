import { useState, useEffectEvent, useEffect, use } from "react";
import countrySerives from "./services/countrys";
import Countrys from "./components/Countrys";
import Country from "./components/Country";

const SearchCountry = ({ search, handleChange }) => {
  return (
    <>
      <form>
        <div>
          <input value={search} onChange={handleChange} />
        </div>
      </form>
    </>
  );
};

const App = () => {
  const [countrys, setCountrys] = useState([]);
  const [search, setSearch] = useState("");
  const [selectCountry, setSelectCountry] = useState(null);

  let countryList = countrys.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase()),
  );

  if (countryList.length === 1) {
    let name = countryList[0].name.common.toLowerCase();
    countrySerives
      .getCountry(name)
      .then((response) => setSelectCountry(response));
  }

  useEffect(() => {
    countrySerives.getAll().then((response) => {
      setCountrys(response);
    });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setSelectCountry(null);
  };

  const handleSelectCountry = (event) => {
    const name = event.target.value;
    console.log("name:", name);
    countrySerives.getCountry(name).then((response) => {
      console.log("response:", response);
      setSelectCountry(response);
    });
  };

  console.log("select:", selectCountry);
  return (
    <div>
      <h1>Countrys</h1>
      <SearchCountry search={search} handleChange={handleSearch} />

      {selectCountry && <Country country={selectCountry} />}

      {!selectCountry &&
        (search && countryList.length <= 10 ? (
          <Countrys countrys={countryList} handle={handleSelectCountry} />
        ) : (
          <p>Too many matches, specify another filter</p>
        ))}
    </div>
  );
};

export default App;
