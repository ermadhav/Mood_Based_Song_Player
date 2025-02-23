import React, { useState, useEffect } from "react";

const MusicRecommender = () => {
  const [thoughts, setThoughts] = useState("");
  const [language, setLanguage] = useState("Random");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetchWeather();
  }, []);
  
  const fetchWeather = async () => {
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=2a473686c7dcd8710fba1ecc09bf3d48&units=metric`
        );
        const data = await response.json();
        setWeather(data);
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleGetMusic = () => {
    console.log(`Getting music for: ${thoughts} in ${language} based on ${weather?.weather[0].description}`);
  };

  const handleGetPlaylist = () => {
    console.log(`Getting playlist for: ${thoughts} in ${language} based on ${weather?.weather[0].description}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.weatherContainer}>
        {weather ? (
          <p>
            {weather.weather[0].icon.includes("d") ? "☀️" : "🌙"} {weather.name}, {weather.weather[0].description}, {weather.main.temp}°C
          </p>
        ) : (
          <p>Loading weather...</p>
        )}
      </div>
      <div style={styles.innerContainer}>
        <h1 style={styles.title}>🎵 Mood-Based Music Recommender 🎶</h1>
        <input
          type="text"
          placeholder="What’s on your mind?"
          value={thoughts}
          onChange={(e) => setThoughts(e.target.value)}
          style={styles.input}
        />
        <label style={styles.label}>🎧 Select a language for your music:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={styles.select}
        >
          <option value="Random">🌍 Random</option>
          <option value="Hindi">🇮🇳 Hindi</option>
          <option value="English">🇺🇸 English</option>
          <option value="Spanish">🇪🇸 Spanish</option>
          <option value="Russian">🇷🇺 Russian</option>
          <option value="Chinese">🇨🇳 Chinese</option>
          <option value="Korean">🇰🇷 Korean</option>
        </select>
        <div style={styles.buttonContainer}>
          <button onClick={handleGetMusic} style={styles.button}>🎼 Get Music</button>
          <button onClick={handleGetPlaylist} style={styles.button}>📜 Get Playlist</button>
        </div>
      </div>
      <footer style={styles.footer}>
        <p>&copy; 2025 All rights reserved | Made with ❤️ by Madhav Tiwari</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    position: "relative",
    overflow: "hidden", // Prevents scrollbars
  },
  weatherContainer: {
    position: "absolute",
    top: "20px",
    left: "20px",
    fontSize: "18px",
    fontWeight: "bold",
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(5px)",
    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.3)",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#282828",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  input: {
    padding: "12px",
    marginBottom: "15px",
    width: "320px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    backgroundColor: "#333",
    color: "#FFF",
    outline: "none",
  },
  label: {
    fontSize: "16px",
    marginBottom: "8px",
    color: "#1DB954",
    fontWeight: "bold",
  },
  select: {
    padding: "12px",
    width: "220px",
    borderRadius: "8px",
    backgroundColor: "#333",
    color: "#FFF",
  },
  buttonContainer: {
    display: "flex",
    gap: "15px",
    marginTop: "15px",
  },
  button: {
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#1DB954",
    color: "#FFFFFF",
    cursor: "pointer",
  },
  footer: {
    position: "absolute",
    bottom: "0",
    width: "100%",
    padding: "10px",
    backgroundColor: "#222",
    color: "#AAA",
  },
};

export default MusicRecommender;
