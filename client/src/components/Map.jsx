import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker, MarkerF } from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
    width: "55vw",
    height: "55vh",
};

// Definiția inițială a centrului nu este necesară aici deoarece va fi gestionată prin starea 'coordinates'
const defaultCenter = {
    lat: 44.43568294269744,
    lng: 26.047689205935985,
};

const Map = ({ address }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyDC_j-yBuVYS1-sDAEjhJgVkBFV6XF4eI4",
        libraries,
    });
    const [coordinates, setCoordinates] = useState(defaultCenter); // Setează defaultCenter ca valoare inițială

    const findLatAndLng = () => {
        if (!address) return; // Verifică dacă adresa există

        const formattedAddress = encodeURIComponent(address);
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=AIzaSyDC_j-yBuVYS1-sDAEjhJgVkBFV6XF4eI4`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.status === "OK") {
                    const { lat, lng } = data.results[0].geometry.location;
                    setCoordinates({ lat, lng });
                } else {
                    console.error('Geocoding failed:', data.status);
                }
            })
            .catch(error => {
                console.error('Error fetching coordinates:', error);
            });
    };

    useEffect(() => {
        findLatAndLng();
    }, [address]);

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    return (
        <div className="bg-green-700 p-3 rounded-lg mb-6 -mt-20">
            <GoogleMap
                key={coordinates.lat + coordinates.lng}
                mapContainerStyle={mapContainerStyle}
                zoom={17}
                center={coordinates}
            >
                <MarkerF position={{lat: coordinates.lat, lng: coordinates.lng}}/>
            </GoogleMap>
        </div>
    );
};

export default Map;
