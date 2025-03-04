// const axios = require("axios");
// const { WEATHER_API_KEY } = require("../config/config");

// const getWeather = async (city) => {
//     try {
//         const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;
//         const response = await axios.get(url);
//         return response.data.weather[0].main.toLowerCase(); // e.g., "clear", "rain", "clouds"
//     } catch (error) {
//         throw new Error("Could not fetch weather data.");
//     }
// };

// module.exports = { getWeather };
