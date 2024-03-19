import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "55vw",
  height: "55vh",
};
const center = {
  lat: 44.43568294269744,
  lng: 26.047689205935985,
};

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDC_j-yBuVYS1-sDAEjhJgVkBFV6XF4eI4",
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div className="bg-green-700 p-3 rounded-lg mb-6 -mt-20">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
      
    
  );
};

export default Map;
