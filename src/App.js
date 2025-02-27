// src/App.js
import React from 'react';
import MusicRecommender from './MusicRecommender';
import Card from './MusicPlaylist';
import { ThemeProvider } from 'styled-components';
import Footer from './Footer';

const theme = {}; // You can add theme properties if needed

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div>
                <MusicRecommender />
                <Card />
                <Footer />
            </div>
        </ThemeProvider>
    );
}

export default App;
