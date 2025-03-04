import React, { useState } from "react";
import MapComponent from "../components/MapComponent";
import Navbar from "../components/Navbar";

const MapPage = () => {
  const [selectedPark, setSelectedPark] = useState("Mill Creek Greenway");

  return (
    <div className="relative w-full h-screen">
      {/* Navbar - Fixed to the top, high z-index to stay above the map */}
      <Navbar />


      {/* Fullscreen Map - Pushes content down so it doesn't overlap navbar */}
      <div className="w-full h-full pt-16"> {/* pt-16 prevents overlap */}
        <MapComponent setSelectedPark={setSelectedPark} />
      </div>
    </div>
  );
};

export default MapPage;
