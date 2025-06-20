import { IonButton, IonContent, IonCheckbox, IonHeader, IonItem, IonPage } from '@ionic/react';
import './Home.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { IonList, IonSelect, IonSelectOption } from '@ionic/react';
import { useEffect, useState } from 'react';
import { obtenerSitios } from "../services/firebaseFunctions";

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

function UpdateVisibleMarkers({ markers, setVisibleMarkers }: { markers: any[], setVisibleMarkers: (m: any[]) => void }) {
  const map = useMap();

  useEffect(() => {
    function update() {
      const bounds = map.getBounds();
      const visibles = markers
        .filter(marker => marker && typeof marker.lat === 'number' && typeof marker.lon === 'number')
        .filter(marker => bounds.contains([marker.lat, marker.lon]));
      setVisibleMarkers(visibles);
    }

    update();
    map.on('moveend', update); //listener

    return () => {
      map.off('moveend', update); // apaga 
    };
  }, [map, markers]);

  return null;
}

const Home: React.FC = () => {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);

  const [showSidebar, setShowSidebar] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [materialesSeleccionados, setMaterialesSeleccionados] = useState<string[]>([]);


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

  const [markers, setMarkers] = useState<any[]>([]);
  const [visibleMarkers, setVisibleMarkers] = useState<any[]>([]);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition([position.coords.latitude, position.coords.longitude]);
          console.log('Ubicación obtenida');
        },
        (error) => {
          console.error('No se pudo obtener la ubicación:', error);
        }
      );
    }

    // Cargar los puntos desde Firebase
    const cargarMarkers = async () => {
      const datosMarkers = await obtenerSitios();
      setMarkers(datosMarkers);
    };
    cargarMarkers();
  }, []);

  return (
    <IonPage>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet"></link>
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

            {markers
              .filter(marker => marker && typeof marker.lat === 'number' && typeof marker.lon === 'number')
              .filter(marker =>
                materialesSeleccionados.length === 0 ||
                (marker.materials && marker.materials.some((mat: string) =>
                  materialesSeleccionados.includes(mat)
                ))
              )
              .map((marker, index) => (
                <Marker key={index} position={[marker.lat, marker.lon]} icon={customIcon}>
                  <Popup>
                    <div className='popup-content'>
                      <h3>{marker.name}</h3>
                      
                      <img src={marker.photo   || '/assets/logo.png'} />
                      <p>
                        Address: {marker.address || 'No address available.'}
                      </p>
                      <p>
                        Bussiness Hours: {marker.bussinessHours || 'No bussiness hours available.'}
                      </p>
                      <p>
                        Materials: {marker.materials && marker.materials.join(', ')}.
                      </p>
                      <p>
                        Instructions: {marker.instructions || 'No specific instructions available.'}
                      </p>
                      <p>
                        Facilities: {marker.facilities || 'No information available.'}
                      </p>
                      <p>
                        Contact: {marker.contact || 'No contact available.'}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            {userPosition && (
              <Marker position={userPosition} icon={currentIcon}>
                <Popup>You're here</Popup>
              </Marker>
            )}
            {userPosition && <SetViewOnUser position={userPosition} />}
            <UpdateVisibleMarkers markers={markers} setVisibleMarkers={setVisibleMarkers} />
          </MapContainer>
        </div>
        <div className={`panel${showSidebar ? '' : ' hidden'}`}>
          <div className='filter-div'>
            <p className='filters'>Filters</p>
            <button className='filter-button'
              onClick={() => setShowFilters((v) => !v)}
              style={{
                transform: showFilters ? 'scaleY(1)' : "scaleY(-1)",
              }}>
              <img src="../../assets/filterbutton.png" alt="Close" />
            </button>
          </div>
          {showFilters && (
            <div className='filter-options'>
              <IonCheckbox
                labelPlacement='end'
                className='checkbox'
                checked={materialesSeleccionados.includes('Paper')}
                onIonChange={e => {
                  const checked = e.detail.checked;
                  setMaterialesSeleccionados(prev =>
                    checked
                      ? [...prev, 'Paper']
                      : prev.filter(m => m !== 'Paper')
                  );
                }}
              >
                Paper
              </IonCheckbox>
              <IonCheckbox labelPlacement='end' className='checkbox'
                checked={materialesSeleccionados.includes('Plastic')}
                onIonChange={e => {
                  const checked = e.detail.checked;
                  setMaterialesSeleccionados(prev =>
                    checked
                      ? [...prev, 'Plastic']
                      : prev.filter(m => m !== 'Plastic')
                  );
                }}> Plastic </IonCheckbox>
              <IonCheckbox labelPlacement='end' className='checkbox'
                checked={materialesSeleccionados.includes('Cardboard')}
                onIonChange={e => {
                  const checked = e.detail.checked;
                  setMaterialesSeleccionados(prev =>
                    checked
                      ? [...prev, 'Cardboard']
                      : prev.filter(m => m !== 'Cardboard')
                  );
                }}> Cardboard </IonCheckbox>
              <IonCheckbox labelPlacement='end' className='checkbox'
                checked={materialesSeleccionados.includes('Tetrapak')}
                onIonChange={e => {
                  const checked = e.detail.checked;
                  setMaterialesSeleccionados(prev =>
                    checked
                      ? [...prev, 'Tetrapak']
                      : prev.filter(m => m !== 'Tetrapak')
                  );
                }}> Tetrapak </IonCheckbox>
              <IonCheckbox labelPlacement='end' className='checkbox' checked={materialesSeleccionados.includes('Oil')}
                onIonChange={e => {
                  const checked = e.detail.checked;
                  setMaterialesSeleccionados(prev =>
                    checked
                      ? [...prev, 'Oil']
                      : prev.filter(m => m !== 'Oil')
                  );
                }}> Oil </IonCheckbox>
              <IonCheckbox labelPlacement='end' className='checkbox'
                checked={materialesSeleccionados.includes('Metal')}
                onIonChange={e => {
                  const checked = e.detail.checked;
                  setMaterialesSeleccionados(prev =>
                    checked
                      ? [...prev, 'Metal']
                      : prev.filter(m => m !== 'Metal')
                  );
                }}> Metal </IonCheckbox>
              <IonCheckbox labelPlacement='end' className='checkbox'
                checked={materialesSeleccionados.includes('Glass')}
                onIonChange={e => {
                  const checked = e.detail.checked;
                  setMaterialesSeleccionados(prev =>
                    checked
                      ? [...prev, 'Glass']
                      : prev.filter(m => m !== 'Glass')
                  );
                }}> Glass </IonCheckbox>
              <IonCheckbox labelPlacement='end' className='checkbox'
                checked={materialesSeleccionados.includes('Electronics')}
                onIonChange={e => {
                  const checked = e.detail.checked;
                  setMaterialesSeleccionados(prev =>
                    checked
                      ? [...prev, 'Electronics']
                      : prev.filter(m => m !== 'Electronics')
                  );
                }}> Electronics </IonCheckbox>
              <IonCheckbox labelPlacement='end' className='checkbox'
                checked={materialesSeleccionados.includes('Batteries')}
                onIonChange={e => {
                  const checked = e.detail.checked;
                  setMaterialesSeleccionados(prev =>
                    checked
                      ? [...prev, 'Batteries']
                      : prev.filter(m => m !== 'Batteries')
                  );
                }}> Batteries </IonCheckbox>
            </div>
          )}
          <p className='visible-sites'>Visible Sites</p>
          <ul className='ul-visible-sites'>
            {visibleMarkers
              .filter(marker =>
                materialesSeleccionados.length === 0 ||
                (marker.materials && marker.materials.some((mat: string) =>
                  materialesSeleccionados.includes(mat)
                ))
              )
              .map((marker, idx) => (
                <li key={idx} className='list-visible-markers'>{marker.name}</li>
              ))}
          </ul>
        </div>
      </IonContent>
    </IonPage >
  );
};

export default Home;
