// src/MusicRecommender.js
import React, { useState } from 'react';

const MusicRecommender = () => {
    const [thoughts, setThoughts] = useState('');
    const [language, setLanguage] = useState('Turkish');

    const handleGetMusic = () => {
        // Logic to get music based on "thoughts" and "language"
        console.log(`Getting music for: ${thoughts} in ${language}`);
    };

    const handleGetPlaylist = () => {
        // Logic to get a playlist based on "thoughts" and "language"
        console.log(`Getting playlist for: ${thoughts} in ${language}`);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Mood-Based Music Recommender</h1>
            <input
                type="text"
                placeholder="What are you thinking?"
                value={thoughts}
                onChange={(e) => setThoughts(e.target.value)}
                style={styles.input}
            />
            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={styles.select}
            >
                <option value="Turkish">Random</option>
                <option value="Turkish">Hindi</option>
                <option value="Turkish">English</option>
                <option value="Turkish">Spanish</option>
                <option value="Turkish">Russian</option>
            </select>
            <div style={styles.buttonContainer}>
                <button onClick={handleGetMusic} style={styles.button}>Get Music</button>
                <button onClick={handleGetPlaylist} style={styles.button}>Get Playlist</button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#121212',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    title: {
        fontSize: '2rem',
        marginBottom: '20px',
    },
    input: {
        padding: '10px',
        marginBottom: '10px',
        width: '300px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    select: {
        padding: '10px',
        marginBottom: '20px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    buttonContainer: {
        display: 'flex',
        gap: '10px',
    },
    button: {
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#1DB954',
        color: '#FFFFFF',
        cursor: 'pointer',
    }
};

export default MusicRecommender;