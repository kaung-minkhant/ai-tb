import './Map.style.css'
import React, {useState,useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/leaflet.css';
const Map = ({Data}) => {
  // if (!Data) {
  //   return <h1>Loading</h1>
  // }
  const [center, setCenter] = useState([0, 0]);
  useEffect(() => {
    if (Data && Data.length > 0) {
      const totalClinics = Data.length;
      const sumLat = Data.reduce((acc, clinic) => acc + parseFloat(clinic.lat), 0);
      const sumLng = Data.reduce((acc, clinic) => acc + parseFloat(clinic.long), 0);
      const avgLat = sumLat / totalClinics;
      const avgLng = sumLng / totalClinics;

      setCenter([avgLat, avgLng]);
    }
  }, [Data]);
  console.log('center', center)
  if (!Data) {
    
    return (
    <div className="title-container background-tint">
      <h1 className="notice-title">Please select your desired location in the dropdowns above.</h1>
    </div>);
  }

  function SetViewOnClick({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());
  
    return null;
  }

  return (

    <MapContainer center={center} 
            zoom={10} 
            scrollWheelZoom={false}
            doubleClickZoom = {false}
            style={{ height: '100%', width: '100%' }}
        >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {/* <Marker position={[16.8172, 96.13228]}>
        <Popup>
          <h3>Hnin Hnin</h3>
          <h4>Doctor: Dr. Win Hlaing</h4>
          <h5>Contact: +959 332 111 222</h5>
        </Popup>
      </Marker> */}
      <SetViewOnClick coords={center} />
      {Data?.map((clinic, index) => (    
        <Marker key={index} position={[clinic.lat, clinic.long]}>
          <Popup>
            <h3>{clinic.name}</h3>
            <h4>Address: {clinic.address}</h4>
            <h4>Doctor: {clinic.doctor}</h4>
            <h4>Contact: {clinic.phone}</h4>
          </Popup>
        </Marker>
      ))}
    </MapContainer>


  );
};

export default Map;
