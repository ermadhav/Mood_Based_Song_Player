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
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    style={styles.select}
                >
                    <option value="Random">Random</option>
                    <option value="Hindi">Hindi</option>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Russian">Russian</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Korean">Korean</option>
                </select>
                <div style={styles.buttonContainer}>
                    <button onClick={handleGetMusic} style={styles.button}>🎼 Get Music</button>
                    <button onClick={handleGetPlaylist} style={styles.button}>📜 Get Playlist</button>
                </div>
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
        backgroundColor: "#1E1E1E",
        color: "#FFFFFF",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
    },
    innerContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#282828",
    },
    title: {
        fontSize: "2.5rem",
        marginBottom: "20px",
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
    },
};

export default MusicRecommender;