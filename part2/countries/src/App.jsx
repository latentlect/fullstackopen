import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  useEffect(() => {
    if (search) {
      const results = countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );

      setFilteredCountries(results);

      if (results.length === 1) {
        setSelectedCountry(results[0]);
      } else {
        setSelectedCountry(null);
      }
    } else {
      setFilteredCountries([]);
      setSelectedCountry(null);
    }
  }, [search, countries]);

  const handleShow = (country) => {
    setSelectedCountry(country);
  };

  const CountryDetails = ({ country }) => {
    if (!country) return null;
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} km²</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <h3>Currency</h3>
        <ul>
          {Object.values(country.currencies).map((currency, index) => (
            <li key={index}>
              {currency.name}({currency.symbol})
            </li>
          ))}
        </ul>
        <img
          src={country.flags.png}
          alt={country.flags.alt}
          width="200"
        />
      </div>
    );
  };

  const CountryList = ({ countries, handleShow }) => {
    if (countries.length > 1 && countries.length < 11) {
      return (
        <ul>
          {countries.map((country) => (
            <li key={country.cca3}>
              {country.name.common}
              <button onClick={() => handleShow(country)}>show</button>
            </li>
          ))}
        </ul>
      );
    } else if (countries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }
  };

  const changeHandler = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      Search <input onChange={changeHandler} />
      <CountryList countries={filteredCountries} handleShow={handleShow} />
      <CountryDetails country={selectedCountry} />
    </div>
  );
};

export default App;
