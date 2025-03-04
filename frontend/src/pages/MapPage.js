import React, { useState } from "react";
import MapComponent from "../components/MapComponent";

const MapPage = () => {
  const [selectedPark, setSelectedPark] = useState("Mill Creek Greenway");

  return (
    <div className="relative w-full h-screen">
      {/* Navbar - Fixed to the top, high z-index to stay above the map */}
      <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white p-4 shadow-md z-50">
        <h1 className="text-2xl font-bold text-center">Explore the Parks of Mill Creek</h1>
      </nav>

      {/* Fullscreen Map - Pushes content down so it doesn't overlap navbar */}
      <div className="w-full h-full pt-16"> {/* pt-16 prevents overlap */}
        <MapComponent setSelectedPark={setSelectedPark} />
      </div>
    </div>
  );
};

export default MapPage;
