import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import './Home.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { verificarCredenciales } from "../services/userRegister.js"
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

  const [showSidebar, setShowSidebar] = useState(true);

  function FixMapResize() {
    const map = useMap();
    useEffect(() => {
      setTimeout(() => {
        map.invalidateSize(); // redibuja del mapa
      }, 300);
    }, [map]);
    return null;
  }
  
  const [hasCentered, setHasCentered] = useState(false);
  function SetViewOnUser({ position }: { position: [number, number] }) {
    const map = useMap();
    useEffect(() => {
      if (!hasCentered && position) {
        map.setView(position, map.getZoom());
        setHasCentered(true);
      }
    }, [position, hasCentered, map]);
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
    { position: [20.62436592459012, -103.42733791349242], popupText: 'Marker 1' },
    { position: [51.515, -0.1], popupText: 'Marker 2' },
    { position: [51.525, -0.11], popupText: 'Marker 3' },
  ];

  return (
    <IonPage>
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
      <IonContent fullscreen className='fondo'>
        <button className='button-panel'
          style={{
            right: showSidebar ? '41vw' : "3vw",
            transform: showSidebar ? 'scaleX(1)' : "scaleX(-1)",
          }}
          onClick={() => setShowSidebar((v) => !v)}
        >
          <img src="../../assets/display.png"></img>
        </button>
        <div style={{ height: '93vh', width: '100%', marginTop: '7vh' }}>
          <MapContainer
            center={userPosition ?? [20.676417, -103.415056]}
            zoom={13}
            style={{ height: '93vh', width: '100%' }}
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
                <Marker position={userPosition} icon={currentIcon}>
                  <Popup>You're here</Popup>
                </Marker>
            )}
            {userPosition && <SetViewOnUser position={userPosition} />}
          </MapContainer>
          {showSidebar && (
            <div className='panel'>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage >
  );
};

export default Home;
