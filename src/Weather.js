import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [error, setError] = useState(null);

  function handleSearch(event) {
    event.preventDefault();
    const apiKey = "ad330884483abf7o091c0c43t8ea93ab";
    const url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

    axios
      .get(url)
      .then((response) => {
        setTemperature(Math.round(response.data.temperature.current));
        setError(null);
      })
      .catch((error) => {
        setTemperature(null);
        setError("Error: City not found.");
      });
  }

  return (
    <div className="Weather">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {temperature !== null && <p>Current temperature: {temperature}°C</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
