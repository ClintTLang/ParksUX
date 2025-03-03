import React from "react";
import MapComponent from "../components/MapComponent";

const MapPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Parks of Mill Creek</h1>
      <p className="text-lg text-gray-700 mb-4">
        Explore different parks in Mill Creek! Click on a marker to learn more.
      </p>
      <MapComponent />
    </div>
  );
};

export default MapPage;
