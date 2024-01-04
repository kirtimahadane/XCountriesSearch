import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

export default function App() {
  const [country, setCountry] = useState("");
  const [countriesData, setCountriesData] = useState([]);
  const getCountriesData = async () => {
    try {
      const res = await axios.get(" https://restcountries.com/v3.1/all");
      console.log(res.data);

      setCountriesData(res.data);
    } catch (error) {
      console.error("Failed fetching data", error.message);
    }
  };

  useEffect(() => {
    getCountriesData();
  }, [country]);

  const handleSearch = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const filteredCountries = countriesData.filter((item) =>
      item.name.common.toLowerCase().includes(country.toLowerCase())
    );
    setCountriesData(filteredCountries);
  };
  return (
    <div className="App">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for countries"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          name="country"
        />
      </form>
      <div className="main-container">
        {countriesData.map((item) => {
          return (
            <div key={item.cca3} className="container">
              <div className="img">
                <img src={item.flags.png} alt={`Flag of ${item.name.common}`} />
              </div>
              <p>{item.name.common}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
