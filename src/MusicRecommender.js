import React, { useState } from "react";

const MusicRecommender = () => {
    const [thoughts, setThoughts] = useState("");
    const [language, setLanguage] = useState("Random");

    const handleGetMusic = () => {
        console.log(`Getting music for: ${thoughts} in ${language}`);
    };

    const handleGetPlaylist = () => {
        console.log(`Getting playlist for: ${thoughts} in ${language}`);
    };

    return (
        <div style={styles.container}>
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
                <p>&copy; 2025 Mood-Based Music Recommender. All rights reserved.</p>
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
        backgroundColor: "#1E1E1E",
        color: "#FFFFFF",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        position: "relative",
        overflow: "hidden",
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
        textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
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
        boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.3)",
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
        border: "2px solid #1DB954",
        borderRadius: "8px",
        backgroundColor: "#333",
        color: "#FFF",
        fontSize: "16px",
        cursor: "pointer",
        outline: "none",
        transition: "all 0.3s ease-in-out",
        boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.3)",
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
        fontSize: "16px",
        transition: "background 0.3s ease-in-out",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
    },
    footer: {
        position: "absolute",
        bottom: "0",
        width: "100%",
        padding: "10px",
        backgroundColor: "#222",
        color: "#AAA",
        fontSize: "14px",
        textAlign: "center",
        boxShadow: "0px -3px 5px rgba(0, 0, 0, 0.3)",
    },
};

export default MusicRecommender;
