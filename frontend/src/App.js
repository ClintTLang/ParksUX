import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MapPage from "./pages/MapPage";
import AboutPage from "./pages/AboutPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import HowItWorksActivity from "./pages/HowItWorksActivity";
import ParkComparisonPage from "./pages/ParkComparisonPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/howitworks" element={<HowItWorksPage />} />
        <Route path="/howitworks/activity" element={<HowItWorksActivity />} />
        <Route path="/comparison" element={<ParkComparisonPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
