import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

// Define park locations
const parkLocations = [
  {
    id: 1,
    name: "Mill Creek Greenway",
    position: [36.0677, -86.6573],
    description: "A scenic greenway along Mill Creek, perfect for walking, running, and cycling.",
  },
  {
    id: 2,
    name: "Smith Springs Park",
    position: [36.0761, -86.6122],
    description: "Community park near Mill Creek featuring playgrounds and walking trails.",
  },
  {
    id: 3,
    name: "Seven Mile Creek Park",
    position: [36.0812, -86.6814],
    description: "Beautiful park with creek access and nature trails.",
  },
  {
    id: 4,
    name: "Antioch Park",
    position: [36.0587, -86.6515],
    description: "Large community park with sports facilities and walking paths.",
  },
  {
    id: 5,
    name: "Hamilton Creek Park",
    position: [36.0891, -86.6122],
    description: "Waterfront park with boat ramp and hiking trails along Percy Priest Lake.",
  },
];

// Custom marker icon
const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
});

const MapComponent = () => {
  const [selectedPark, setSelectedPark] = useState(null);

  return (
    <div className="w-full h-screen">
      <MapContainer center={[36.0677, -86.6573]} zoom={12} className="h-full">
        {/* OpenStreetMap Tile Layer (No API Key Needed) */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Render park markers */}
        {parkLocations.map((park) => (
          <Marker
            key={park.id}
            position={park.position}
            icon={customIcon}
            eventHandlers={{
              click: () => {
                setSelectedPark(park);
              },
            }}
          />
        ))}

        {/* Popup when a park is clicked */}
        {selectedPark && (
          <Popup
            position={selectedPark.position}
            onClose={() => setSelectedPark(null)}
          >
            <div className="p-2">
              <h2 className="text-lg font-semibold">{selectedPark.name}</h2>
              <p className="text-gray-600">{selectedPark.description}</p>
            </div>
          </Popup>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
