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
import { useEffect, useState } from 'react';

//remplazarlo por el icono del marker que quieras usar
import customMarkerIcon from '../img/point.png';
import customMarkerIcon2 from '../img/point1.png';

// Fix for missing marker icons
const customIcon = new L.Icon({
  iconUrl: customMarkerIcon,
  iconSize: [50, 50], // Tamaño del ícono
  iconAnchor: [12, 41], // Punto de anclaje del ícono
  popupAnchor: [1, -34], // Punto de anclaje del popup
  shadowUrl: markerShadow, // Sombra opcional
  shadowSize: [41, 41], // Tamaño de la sombra
});

const currentIcon = new L.Icon({
  iconUrl: customMarkerIcon2,
  iconSize: [50, 50], // Tamaño del ícono
  iconAnchor: [12, 41], // Punto de anclaje del ícono
  popupAnchor: [1, -34], // Punto de anclaje del popup
  shadowUrl: markerShadow, // Sombra opcional
  shadowSize: [41, 41], // Tamaño de la sombra
});

const Home: React.FC = () => {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);

  function SetViewOnUser({ position }: { position: [number, number] }) {
    const map = useMap();
    map.setView(position, map.getZoom());
    return null;
  }

  function FixMapResize() {
    const map = useMap();
    useEffect(() => {
      setTimeout(() => {
        map.invalidateSize(); // redibuja del mapa
      }, 300);
    }, [map]);
    return null;
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition([position.coords.latitude, position.coords.longitude]);
          console.log('Ubicación obtenida:', position.coords);
        },
        (error) => {
          console.error('No se pudo obtener la ubicación:', error);
        }
      );
    } else {
      console.error('Geolocalización no soportada');
    }
  }, []);

  //colocar las posiciones de los markers y el texto que se mostrará en el popup
  const markers: { position: [number, number]; popupText: string }[] = [
    { position: [20.62436592459012, -103.42733791349242], popupText: 'Marker 1'},
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
        <div style={{ height: 'calc(100vh - 120px)', width: '100%', position: 'relative', marginTop: '65px' }}>
          <MapContainer
            center={userPosition ?? [51.505, -0.09]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            attributionControl={true}
          >
            <FixMapResize />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {markers.map((marker, index) => (
              <Marker key={index} position={marker.position} icon={customIcon}>
                <Popup>{marker.popupText}</Popup>
              </Marker>
            ))}
            {userPosition && (
              <>
                <Marker position={userPosition} icon={currentIcon}>
                  <Popup>You're here</Popup>
                </Marker>
                <SetViewOnUser position={userPosition} />
              </>
            )}
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
