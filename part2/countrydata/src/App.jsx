import { useState, useEffectEvent, useEffect, use } from "react";
import countrySerives from "./services/countrys";
import Countrys from "./components/Countrys";
import Country from "./components/Country";
import axios from "axios";

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

  let countryList = countrys.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase()),
  );

  if (countryList.length === 1) {
    let name = countryList[0].name.common.toLowerCase();
    countrySerives
      .getCountry(name)
      .then((response) => (countryList = response));
  }
  console.log(countryList);
  if (!countryList) {
    console.log("sin datos");
  }
  useEffect(() => {
    countrySerives.getAll().then((response) => {
      setCountrys(response);
    });
  }, []);

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
  };

  return (
    <div>
      <h1>Countrys</h1>
      <SearchCountry search={search} handleChange={handleSearch} />

      {search && countryList.length > 1 && countryList.length <= 10 && (
        <Countrys countrys={countryList} />
      )}

      {search && countryList.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}

      {search && countryList.length === 1 && (
        <Country country={countryList[0]} />
      )}
    </div>
  );
};

export default App;
