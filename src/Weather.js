import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather() {
  const [city, setCity] = useState("Colchester");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDefault = () => {
      const url = `https://api.shecodes.io/weather/v1/current?query=Colchester&key=${apiKey}&units=metric`;

      axios
        .get(url)
        .then((response) => {
          setWeatherData(response.data);
          setError(null);
          fetchForecast("Colchester");
        })
        .catch(() => {
          setWeatherData(null);
          setForecastData([]);
          setError("Error: City not found.");
        });
    };

    fetchDefault();
  }, []);

  const apiKey = "ad330884483abf7o091c0c43t8ea93ab";

  function handleSearch(event) {
    event.preventDefault();
    if (!city) return;

    const url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios
      .get(url)
      .then((response) => {
        setWeatherData(response.data);
        setError(null);
        fetchForecast(response.data.city);
      })
      .catch(() => {
        setWeatherData(null);
        setForecastData([]);
        setError("Error: City not found.");
      });
  }

  function fetchForecast(city) {
    const forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

    axios.get(forecastUrl).then((response) => {
      setForecastData(response.data.daily.slice(0, 5));
    });
  }

  function formatDate(date) {
    const options = { weekday: "long", hour: "2-digit", minute: "2-digit" };
    return date.toLocaleTimeString([], options);
  }

  function formatDay(timestamp) {
    const date = new Date(timestamp * 1000);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  }

  return (
    <div className="weather-app">
      <header>
        <h1>Weather App</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter a city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      </header>

      {weatherData && (
        <main>
          <div className="current-weather">
            <div>
              <h2 className="current-city">{weatherData.city}</h2>
              <div className="current-details">
                <span>{formatDate(new Date())}, </span>
                <span>{weatherData.condition.description}</span>
                <br />
                <span>
                  Humidity: <strong>{weatherData.temperature.humidity}%</strong>
                  ,{" "}
                </span>

                <span>
                  Wind: <strong>{weatherData.wind.speed} km/h</strong>
                </span>
              </div>
            </div>
            <div className="current-temperature">
              <img
                src={weatherData.condition.icon_url}
                alt={weatherData.condition.description}
                className="current-temperature-icon"
              />
              <div className="current-temperature-value">
                {Math.round(weatherData.temperature.current)}
                <span className="current-temperature-unit">°C</span>
              </div>
            </div>
          </div>

          <div className="weather-forecast">
            {forecastData.map((day, index) => (
              <div className="weather-forecast-day" key={index}>
                <div className="weather-forecast-date">
                  {formatDay(day.time)}
                </div>
                <img
                  src={day.condition.icon_url}
                  alt={day.condition.description}
                  className="weather-forecast-icon"
                />
                <div className="weather-forecast-temperatures">
                  <div className="weather-forecast-temperature">
                    <strong>{Math.round(day.temperature.maximum)}°</strong>
                  </div>
                  <div className="weather-forecast-temperature">
                    {Math.round(day.temperature.minimum)}°
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      <footer>
        <p>
          <p>
            This project was coded by{" "}
            <a
              href="https://github.com/zoeblighton"
              target="_blank"
              rel="noopener noreferrer"
            >
              Zoe Blighton
            </a>{" "}
            and is open-sourced on{" "}
            <a
              href="https://github.com/zoeblighton/weather-react-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            .
          </p>{" "}
        </p>
      </footer>
    </div>
  );
}
