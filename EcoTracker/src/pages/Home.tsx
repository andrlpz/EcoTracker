import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import './Home.css';
import { playCircle, radio, library, search } from 'ionicons/icons';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

//remplazarlo por el icono del marker que quieras usar
import customMarkerIcon from '../img/Logo 2.png';

// Fix for missing marker icons
const customIcon = new L.Icon({
  iconUrl: customMarkerIcon,
  iconSize: [25, 41], // Tamaño del ícono
  iconAnchor: [12, 41], // Punto de anclaje del ícono
  popupAnchor: [1, -34], // Punto de anclaje del popup
  shadowUrl: markerShadow, // Sombra opcional
  shadowSize: [41, 41], // Tamaño de la sombra
});

//colocar las posiciones de los markers y el texto que se mostrará en el popup
const Home: React.FC = () => {
  const markers: { position: [number, number]; popupText: string }[] = [
    { position: [51.505, -0.09], popupText: 'Marker 1' },
    { position: [51.515, -0.1], popupText: 'Marker 2' },
    { position: [51.525, -0.11], popupText: 'Marker 3' },
  ];

  return (
    <IonPage>
      <IonContent fullscreen className='fondo'>
        <IonHeader>
          <div className='logo-header-home'>
            <img src="../../assets/Logo 2.png"></img>
          </div>
          <div className='logo-name-home'>
            <img src="../../assets/EcoTracker.png"></img>
          </div>
          <div className='div-header'>
          </div>
        </IonHeader>
        <div style={{ height: '500px', width: '100%', marginTop: '65px' }}>
          <MapContainer
            center={[51.505, -0.09] as LatLngExpression}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            attributionControl={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
           {markers.map((marker, index) => (
              <Marker key={index} position={marker.position} icon={customIcon}>
                <Popup>{marker.popupText}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        <IonFooter>
          <div className='div-footer'></div>
        </IonFooter>
      </IonContent>
    </IonPage>
  );
};

export default Home;
