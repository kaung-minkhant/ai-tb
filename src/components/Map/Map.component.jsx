import './Map.style.css'
import React, {useState,useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/leaflet.css';
const Map = () => {
  const position = [16.8172, 96.13228];

  return (
    <MapContainer center={position} 
            zoom={13} 
            scrollWheelZoom={false}
            dragging = {false}
            doubleClickZoom = {false}
            style={{ height: '400px', width: '100%' }}
        >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      <Marker position={position}>
        <Popup>
          Hello, this is a sample marker!
        </Popup>
      </Marker>
    </MapContainer>


  );
};

export default Map;
