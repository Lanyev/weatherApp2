import React, { useState } from "react";

const WeatherCard = ({
  weather,
  temperature,
  isCelsius,
  changeUnitTemperature,
  newCallAPISearch,
  loading,
  setLoading,
}) => {
  console.log(weather);
  const [place, setPlace] = useState("");

  const handleChangePlace = (e) => {
    setPlace(e.target.value);
    console.log(e.target.value);
  };

  return (
    <article className="weatherCard">
      <div className="search-box">
        <input
          type="text"
          value={place}
          onChange={handleChangePlace}
          className="search-bar"
          placeholder="Search..."
        />
        <button
          onClick={() => newCallAPISearch(place)}
          className="search-button"
        >
          Search
        </button>
      </div>
      <header>
        <h1>{`${weather.name}, ${weather.sys.country}`}</h1>
        <h2>Location</h2>
      </header>
      <section>
        <div className="imgWeather">
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt="Clima"
          />
        </div>
        <ul>
          <li>{weather.weather[0].description}</li>
          <li>Wind Speed:{weather.wind.speed} m/s</li>
          <li>Clouds: {weather.clouds.all}</li>
          <li>Humidity: {weather.main.humidity}%</li>
        </ul>
      </section>
      <div className="temp">
        <p>
          {isCelsius
            ? `${temperature.celsius}  C°`
            : `${temperature.fahrenheit}  F°`}
        </p>
      </div>
      <div className="card-box-button">
        <button className="cardButton" onClick={changeUnitTemperature}>
          Change to {isCelsius ? "°F" : "°C"}
        </button>
      </div>
    </article>
  );
};

export default WeatherCard;
