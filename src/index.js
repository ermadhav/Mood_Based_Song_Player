const express = require("express");
const cors = require("cors");
const { recommendMusic } = require("./components/MusicRecommender"); // Import your function

const app = express();
app.use(cors());
app.use(express.json());

// API endpoint for fetching recommendations
app.get("/recommend", async (req, res) => {
  const { mood, weather } = req.query; // Get mood and weather from the frontend
  try {
    const recommendations = await recommendMusic(mood, weather); // Call your function
    res.json({ tracks: recommendations });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
