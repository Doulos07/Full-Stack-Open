import { useState, useEffect } from "react";
import countryServices from "./services/countrys";
import Countrys from "./components/Countrys";
import Country from "./components/Country";

const SearchCountry = ({ search, handleChange }) => (
  <form>
    <input value={search} onChange={handleChange} />
  </form>
);

const App = () => {
  const [countrys, setCountrys] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedName, setSelectedName] = useState(null);
  const [activeCountry, setActiveCountry] = useState(null);

  useEffect(() => {
    countryServices.getAll().then(setCountrys);
  }, []);

  const countryList = countrys.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase()),
  );

  // nullish
  const filterCountry =
    selectedName ??
    (countryList.length === 1 ? countryList[0].name.common : null);

  useEffect(() => {
    if (!filterCountry) {
      setActiveCountry(null);
    } else {
      countryServices
        .getCountry(filterCountry.toLowerCase())
        .then(setActiveCountry);
    }
  }, [filterCountry]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setSelectedName(null);
  };

  const handleSelectCountry = (event) => {
    setSelectedName(event.target.value);
  };

  return (
    <div>
      <h1>Countries</h1>
      <SearchCountry search={search} handleChange={handleSearch} />

      {/* Single selected country */}
      {activeCountry ? (
        <Country country={activeCountry} />
      ) : /* 10 or fewer countries */ search && countryList.length <= 10 ? (
        <Countrys countrys={countryList} handle={handleSelectCountry} />
      ) : /* More than 10 countries */ search ? (
        <p>Too many matches, specify another filter</p>
      ) : null}
    </div>
  );
};

export default App;
