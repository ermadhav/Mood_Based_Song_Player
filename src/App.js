// src/App.js
import React from 'react';
import MusicRecommender from './MusicRecommender';
import Card from './MusicPlayer';
import { ThemeProvider } from 'styled-components';

const theme = {}; // You can add theme properties if needed

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div>
                <MusicRecommender />
                <Card />
            </div>
        </ThemeProvider>
    );
}

export default App;
