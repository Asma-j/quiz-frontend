// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Use Routes instead of Switch
import './App.css';
import HeroSection from './components/HeroSection';  // Import HeroSection
import Page2Quiz from './components/Page2Quiz';  // Import Page2Quiz

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>  {/* Use Routes instead of Switch */}
          <Route path="/" element={<HeroSection />} />  {/* Updated syntax for Route */}
          <Route path="/quiz" element={<Page2Quiz />} />  {/* Updated syntax for Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
