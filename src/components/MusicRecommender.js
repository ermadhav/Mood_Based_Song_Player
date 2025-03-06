// import React, { useState, useEffect } from "react";

// const MusicRecommender = () => {
//   const [thoughts, setThoughts] = useState("");
//   const [language, setLanguage] = useState("Random");
//   const [weather, setWeather] = useState(null);

//   useEffect(() => {
//     fetchWeather();
//   }, []);

//   const fetchWeather = async () => {
//     try {
//       navigator.geolocation.getCurrentPosition(async (position) => {
//         const { latitude, longitude } = position.coords;
//         const response = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=2a473686c7dcd8710fba1ecc09bf3d48&units=metric`
//         );
//         const data = await response.json();
//         setWeather(data);
//       });
//     } catch (error) {
//       console.error("Error fetching weather data:", error);
//     }
//   };

//   const handleGetMusic = () => {
//     console.log(`Getting music for: ${thoughts} in ${language} based on ${weather?.weather[0].description}`);
//   };

//   const handleGetPlaylist = () => {
//     console.log(`Getting playlist for: ${thoughts} in ${language} based on ${weather?.weather[0].description}`);
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.weatherContainer}>
//         {weather ? (
//           <p>
//             {weather.weather[0].icon.includes("d") ? "☀️" : "🌙"} {weather.name}, {weather.weather[0].description}, {weather.main.temp}°C
//           </p>
//         ) : (
//           <p>Loading weather...</p>
//         )}
//       </div>
//       <div style={styles.innerContainer}>
//         <h1 style={styles.title}>🎵 Mood-Based Music Recommender 🎶</h1>
//         <input
//           type="text"
//           placeholder="What’s on your mind?"
//           value={thoughts}
//           onChange={(e) => setThoughts(e.target.value)}
//           style={styles.input}
//         />
//         <label style={styles.label}>🎧 Select a language for your music:</label>
//         <select
//           value={language}
//           onChange={(e) => setLanguage(e.target.value)}
//           style={styles.select}
//         >
//           <option value="Random">🌍 Random</option>
//           <option value="Hindi">🇮🇳 Hindi</option>
//           <option value="English">🇺🇸 English</option>
//           <option value="Spanish">🇪🇸 Spanish</option>
//           <option value="Russian">🇷🇺 Russian</option>
//           <option value="Chinese">🇨🇳 Chinese</option>
//           <option value="Korean">🇰🇷 Korean</option>
//         </select>
//         <div style={styles.buttonContainer}>
//           <button onClick={handleGetMusic} style={styles.button}>🎼 Get Music</button>
//           <button onClick={handleGetPlaylist} style={styles.button}>📜 Get Playlist</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     height: "100vh",
//     width: "100vw",
//     backgroundColor: "#1E1E1E",
//     color: "#FFFFFF",
//     textAlign: "center",
//     fontFamily: "Arial, sans-serif",
//     position: "relative",
//     overflow: "hidden", // Prevents scrollbars
//   },
//   weatherContainer: {
//     position: "absolute",
//     top: "20px",
//     left: "20px",
//     fontSize: "18px",
//     fontWeight: "bold",
//     padding: "10px",
//     borderRadius: "8px",
//     backgroundColor: "rgba(255, 255, 255, 0.2)",
//     backdropFilter: "blur(5px)",
//     boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.3)",
//   },
//   innerContainer: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     padding: "20px",
//     borderRadius: "10px",
//     backgroundColor: "#282828",
//     boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
//   },
//   title: {
//     fontSize: "2.5rem",
//     marginBottom: "20px",
//     fontWeight: "bold",
//   },
//   input: {
//     padding: "12px",
//     marginBottom: "15px",
//     width: "320px",
//     borderRadius: "8px",
//     border: "none",
//     fontSize: "16px",
//     backgroundColor: "#333",
//     color: "#FFF",
//     outline: "none",
//   },
//   label: {
//     fontSize: "16px",
//     marginBottom: "8px",
//     color: "#1DB954",
//     fontWeight: "bold",
//   },
//   select: {
//     padding: "12px",
//     width: "220px",
//     borderRadius: "8px",
//     backgroundColor: "#333",
//     color: "#FFF",
//   },
//   buttonContainer: {
//     display: "flex",
//     gap: "15px",
//     marginTop: "15px",
//   },
//   button: {
//     padding: "12px 24px",
//     borderRadius: "8px",
//     border: "none",
//     backgroundColor: "#1DB954",
//     color: "#FFFFFF",
//     cursor: "pointer",
//   },

// };

// export default MusicRecommender;

import React, { useState, useEffect } from "react";
import Sentiment from "sentiment";
import axios from "axios";

const MusicRecommender = () => {
  const [thoughts, setThoughts] = useState("");
  const [language, setLanguage] = useState("Random");
  const [weather, setWeather] = useState(null);
  const [recommendation] = useState("");

  const SPOTIFY_CLIENT_ID = "faa3988e5e4c4952bcc099f091bb99cb";
  const SPOTIFY_CLIENT_SECRET = "977a5b7b4f964ae4a661ca6ea9c4559f";
  const SPOTIFY_API_URL = "https://api.spotify.com/v1/recommendations";

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

  const analyzeSentiment = (text) => {
    const sentiment = new Sentiment();
    const result = sentiment.analyze(text);
    return result.score; // Positive score for positive sentiment, negative for negative
  };

  const handleGetMusic = async () => {
    const sentimentScore = analyzeSentiment(thoughts);
    console.log("Sentiment Score:", sentimentScore); // Log the sentiment score
    let mood = "neutral";

    if (sentimentScore > 0) {
      mood = "happy";
    } else if (sentimentScore < 0) {
      mood = "sad";
    }
    await recommendMusic(mood, weather);
  };

  const GENRE_API_URL =
    "https://api.spotify.com/v1/recommendations/available-genre-seeds";

  // Function to fetch Spotify Token
  const getSpotifyToken = async () => {
    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({ grant_type: "client_credentials" }).toString(),
        {
          headers: {
            Authorization:
              "Basic " + btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`),
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log("Spotify Token:", response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      console.error(
        "Error fetching Spotify token:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };

  // Function to get available genres from Spotify
  const getAvailableGenres = async (token) => {
    try {
      const response = await axios.get(GENRE_API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Available Spotify Genres:", response.data.genres);
      return response.data.genres;
    } catch (error) {
      console.error(
        "Error fetching available genres:",
        error.response ? error.response.data : error.message
      );
      return [];
    }
  };

  // Function to recommend music based on mood and weather
  const recommendMusic = async (mood, weather) => {
    const token = await getSpotifyToken();
    if (!token) {
      console.error("Error: Missing Spotify access token.");
      return "Error: Could not retrieve Spotify token.";
    }

    // Define mood-based genres
    const moodGenres = {
      happy: "pop,party",
      sad: "sad,acoustic",
      energetic: "rock,dance",
      calm: "chill,ambient",
    };

    // Define weather-based genre modifications
    const weatherGenres = {
      rainy: "blues,jazz",
      sunny: "reggae,latin",
      cloudy: "indie,lo-fi",
    };

    // Set genres dynamically
    let seedGenres = moodGenres[mood] || "chill";
    if (weatherGenres[weather]) {
      seedGenres += `,${weatherGenres[weather]}`;
    }

    console.log("Using seed genres:", seedGenres);

    // Validate seed genres against Spotify's available genres
    const availableGenres = await getAvailableGenres(token);
    const validGenres = seedGenres
      .split(",")
      .filter((genre) => availableGenres.includes(genre));

    if (validGenres.length === 0) {
      console.error("Error: No valid genres found.");
      return "Error: No valid genres found.";
    }

    try {
      const response = await axios.get(SPOTIFY_API_URL, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          seed_genres: validGenres.join(","), // Use only valid genres
          limit: 5, // Number of recommendations
        },
      });

      console.log("Spotify Recommendations:", response.data);

      const tracks = response.data.tracks
        .map((track) => `${track.name} by ${track.artists[0].name}`)
        .join(", ");

      return `Recommended tracks: ${tracks}`;
    } catch (error) {
      console.error(
        "Error fetching recommendations from Spotify:",
        error.response
          ? JSON.stringify(error.response.data, null, 2)
          : error.message
      );
      return "Error fetching music recommendations.";
    }
  };

  // const getSpotifyToken = async () => {
  //   try {
  //     const response = await axios.post(
  //       "https://accounts.spotify.com/api/token",
  //       null,
  //       {
  //         params: {
  //           grant_type: "client_credentials",
  //         },
  //         headers: {
  //           Authorization:
  //             "Basic " + btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`),
  //           "Content-Type": "application/x-www-form-urlencoded",
  //         },
  //       }
  //     );
  //     console.log("Spotify Token:", response.data.access_token);
  //     return response.data.access_token;
  //   } catch (error) {
  //     console.error(
  //       "Error fetching Spotify token:",
  //       error.response ? error.response.data : error.message
  //     );
  //     throw error;
  //   }
  // };

  // const recommendMusic = async (mood, weather) => {
  //   const token = await getSpotifyToken();
  //   let seedGenres = "";

  //   // Set seed genres based on mood
  //   if (mood === "happy") {
  //     seedGenres = "pop,party";
  //   } else if (mood === "sad") {
  //     seedGenres = "sad,acoustic";
  //   } else if (mood === "energetic") {
  //     seedGenres = "rock,dance";
  //   } else {
  //     seedGenres = "chill";
  //   }

  //   // Adjust recommendations based on weather
  //   if (weather === "rainy") {
  //     seedGenres += ",blues,jazz";
  //   } else if (weather === "sunny") {
  //     seedGenres += ",reggae,latin";
  //   }

  //   try {
  //     const response = await axios.get(SPOTIFY_API_URL, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       params: {
  //         seed_genres: seedGenres,
  //         limit: 5, // Number of recommendations
  //       },
  //     });

  //     console.log("Spotify Recommendations:", response.data);
  //     const tracks = response.data.tracks
  //       .map((track) => `${track.name} by ${track.artists[0].name}`)
  //       .join(", ");

  //     return `Recommended tracks: ${tracks}`;
  //   } catch (error) {
  //     console.error(
  //       "Error fetching recommendations from Spotify:",
  //       error.response ? error.response.data : error.message
  //     );
  //   }
  // };

  return (
    <div style={styles.container}>
      <div style={styles.weatherContainer}>
        {weather && weather.weather && weather.weather.length > 0 ? (
          <p>
            {weather.weather[0].icon.includes("d") ? "☀️" : "🌙"} {weather.name}
            , {weather.weather[0].description}, {weather.main.temp}°C
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
          <button onClick={handleGetMusic} style={styles.button}>
            🎼 Get Music
          </button>
        </div>
        {recommendation && <p>{recommendation}</p>}
      </div>
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
};

// Add your styles here...

export default MusicRecommender;
