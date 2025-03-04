import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MapPage from "./pages/MapPage";
import AboutPage from "./pages/AboutPage";
import ParkComparisonPage from "./pages/ParkComparisonPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/comparison" element={<ParkComparisonPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
