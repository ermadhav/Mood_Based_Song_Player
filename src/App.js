// src/App.js
import React from 'react';
import MusicRecommender from './components/MusicRecommender';
import Card from './components/MusicPlaylist';
import { ThemeProvider } from 'styled-components';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';

const theme = {}; // You can add theme properties if needed

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div>
                <MusicRecommender />
                <MusicPlayer />
                <Card />
                <Footer />
            </div>
        </ThemeProvider>
    );
}

export default App;