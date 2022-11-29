import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temperature, setTemperature] = useState();
  const [isCelsius, setIsCelsius] = useState(true);
  const [loading, setLoading] = useState(false);

  const newCallAPISearch = (cityName) => {
    const API_KEY = "6babd9f397072cd3e87b5238726de264";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
    axios
      .get(URL)
      .then((res) => setWeather(res.data))
      .catch((error) => console.log(error));
  };

  const changeUnitTemperature = () => setIsCelsius(!isCelsius);

  const success = ({ coords: { latitude, longitude } }) => {
    console.log({ latitude, longitude });
    setCoords({
      latitude,
      longitude,
    });
  };
  /*Loader */
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);
  /*Fecha */
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  /*CurrentPosition */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (coords) {
      const { latitude, longitude } = coords;
      const API_KEY = "6babd9f397072cd3e87b5238726de264";
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

      axios
        .get(URL)
        .then(({ data }) => {
          const kelvin = data.main.temp;
          const celsius = (data.main.temp - 273.15).toFixed();
          const fahrenheit = (celsius * 9) / 5 + 32;
          setTemperature({ celsius, fahrenheit });
          setWeather(data);
        })
        .catch((err) => console.log(err));
    }
  }, [coords]);

  return (
    <div className="App">
      {weather ? (
        <WeatherCard
          weather={weather}
          temperature={temperature}
          isCelsius={isCelsius}
          setIsCelsius={setIsCelsius}
          changeUnitTemperature={changeUnitTemperature}
          newCallAPISearch={newCallAPISearch}
        />
      ) : (
        <img src="src/assets/752.svg" alt="" />
      )}
      <div className="date">{dateBuilder(new Date())}</div>
    </div>
  );
}

export default App;
