import React, { useState } from "react";

function WeatherModule() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE;

  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/weather?city=${city}`);
      if (!res.ok) throw new Error("Failed to fetch weather");
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError("Unable to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Weather Info</h2>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <div>
          <p>
            <strong>{data.city}</strong>, {data.country}
          </p>
          <p>{data.temp_c}°C</p>
          <p>{data.description}</p>
          <p>Humidity: {data.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default WeatherModule;
