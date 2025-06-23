import { IonButton, IonContent, IonCheckbox, IonHeader, IonItem, IonPage, useIonViewDidEnter, useIonViewWillEnter } from '@ionic/react';
import './Home.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { IonList, IonSelect, IonSelectOption } from '@ionic/react';
import { useEffect, useState, useRef } from 'react';
import { obtenerSitios, agregarSitio, obtenerFavoritos, quitarSitio } from "../services/firebaseFunctions";

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

function arraysAreEqual(a: any[], b: any[]) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i]?.id !== b[i]?.id) return false;
  }
  return true;
}

function UpdateVisibleMarkers({ markers, setVisibleMarkers }: { markers: any[], setVisibleMarkers: (m: any[]) => void }) {
  const map = useMap();

  useEffect(() => {
    function update() {
      const bounds = map.getBounds();
      const visibles = markers
        .filter(marker => marker && typeof marker.lat === 'number' && typeof marker.lon === 'number')
        .filter(marker => bounds.contains([marker.lat, marker.lon]));
      setVisibleMarkers((prev: any[]) => arraysAreEqual(prev, visibles) ? prev : visibles);
    }

    update();
    map.on('moveend', update);

    return () => {
      map.off('moveend', update);
    };
  }, [map, markers]);

  return null;
}

const Home: React.FC = () => {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [materialesSeleccionados, setMaterialesSeleccionados] = useState<string[]>([]);
  const usuarioId = localStorage.getItem('usuarioId');
  const [visibleMarkers, setVisibleMarkers] = useState<any[]>([]);
  const markerRefs = useRef<{ [key: string]: L.Marker | null }>({});
  const [favoritesSet, setFavoritesSet] = useState<Set<string>>(new Set());

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
  useIonViewWillEnter(() => {
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

    const cargarMarkers = async () => {
      const datosMarkers = await obtenerSitios();
      setMarkers(datosMarkers);
    };
    cargarMarkers();
  }, []);

  useIonViewDidEnter(() => {
    const loadFavorites = async () => {
      if (!usuarioId) return;
      try {
        const favs = await obtenerFavoritos(usuarioId);
        setFavoritesSet(new Set(favs));
      } catch (error) {
        console.error("Error cargando favoritos:", error);
      }
    };
    loadFavorites();
  });

  const toggleFavorite = async (marker: any) => {
    if (!usuarioId) return;
    const newSet = new Set(favoritesSet);
    const wasFavorite = newSet.has(marker.id);
    wasFavorite ? newSet.delete(marker.id) : newSet.add(marker.id);
    setFavoritesSet(newSet);
    try {
      wasFavorite
        ? await quitarSitio(usuarioId, marker)
        : await agregarSitio(usuarioId, marker);
    } catch (error) {
      console.error("Error actualizando favoritos:", error);
      wasFavorite ? newSet.add(marker.id) : newSet.delete(marker.id);
      setFavoritesSet(newSet);
    }
  };

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
        <div style={{ height: '93vh', width: '100%', marginTop: '7vh', maxHeight: '93vh' }}>
          <MapContainer
            center={userPosition ?? [20.676417, -103.415056]}
            zoom={14}
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
              .map((marker) => (
                <Marker key={marker.id} position={[marker.lat, marker.lon]} icon={customIcon} ref={ref => { markerRefs.current[marker.id] = ref; }}>
                  <Popup>
                    <div className='popup-content' id='popup-content'>
                      <div className='popup-header'>
                        <p className='name-site'>{marker.name}</p>
                        <button
                          className='star'
                          onClick={() => toggleFavorite(marker)}
                        >
                          <img
                            src={favoritesSet.has(marker.id)
                              ? "/assets/star-filled.png"
                              : "/assets/star.png"} />
                        </button>
                      </div>
                      <img src={marker.photo || '/assets/logo.png'} />
                      <p>
                        <strong>Address: </strong>{marker.address || 'No address available.'}
                      </p>
                      <p>
                        <strong>Bussiness Hours: </strong>{marker.bussinessHours || 'No bussiness hours available.'}
                      </p>
                      <div className='div-days'>
                        {marker.sunday ? (<img src="../../assets/sundayopen.png" className='day-open' />) : (<img src="../../assets/sunday.png" className='day-icon' />)}
                        {marker.monday ? (<img src="../../assets/mondayopen.png" className='day-open' />) : (<img src="../../assets/monday.png" className='day-icon' />)}
                        {marker.tuesday ? (<img src="../../assets/tuesdayopen.png" className='day-open' />) : (<img src="../../assets/tuesday.png" className='day-icon' />)}
                        {marker.wednesday ? (<img src="../../assets/wednesdayopen.png" className='day-open' />) : (<img src="../../assets/wednesday.png" className='day-icon' />)}
                        {marker.thursday ? (<img src="../../assets/thursdayopen.png" className='day-open' />) : (<img src="../../assets/thursday.png" className='day-icon' />)}
                        {marker.friday ? (<img src="../../assets/fridayopen.png" className='day-open' />) : (<img src="../../assets/friday.png" className='day-icon' />)}
                        {marker.saturday ? (<img src="../../assets/saturdayopen.png" className='day-open' />) : (<img src="../../assets/saturday.png" className='day-icon' />)}
                      </div>
                      <p>
                        <strong>Materials: </strong>{marker.materials && marker.materials.join(', ')}.
                      </p>
                      <p>
                        <strong>Instructions: </strong>{marker.instructions || 'No specific instructions available.'}
                      </p>
                      <p>
                        <strong> Facilities: </strong>{marker.facilities || 'No information available.'}
                      </p>
                      <p>
                        <strong>Contact: </strong>{marker.contact || 'No contact available.'}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            {userPosition && (
              <Marker position={userPosition} icon={currentIcon}>
                <Popup><div className='popup-youre-here'>You're here</div></Popup>
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
                checked={materialesSeleccionados.includes('TetraPak')}
                onIonChange={e => {
                  const checked = e.detail.checked;
                  setMaterialesSeleccionados(prev =>
                    checked
                      ? [...prev, 'TetraPak']
                      : prev.filter(m => m !== 'TetraPak')
                  );
                }}> TetraPak </IonCheckbox>
              <IonCheckbox labelPlacement='end' className='checkbox'
                checked={materialesSeleccionados.includes('Styrofoam')}
                onIonChange={e => {
                  const checked = e.detail.checked;
                  setMaterialesSeleccionados(prev =>
                    checked
                      ? [...prev, 'Styrofoam']
                      : prev.filter(m => m !== 'Styrofoam')
                  );
                }}> TetraPak </IonCheckbox>
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
          <p className='visible-sites'>Visible Recycling Facilities</p>
          <ul className='ul-visible-sites'>
            {visibleMarkers
              .filter(marker =>
                materialesSeleccionados.length === 0 ||
                (marker.materials && marker.materials.some((mat: string) =>
                  materialesSeleccionados.includes(mat)
                ))
              )
              .map((marker, idx) => (
                <li key={marker.id}
                  className='list-visible-markers'
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    const ref = markerRefs.current[marker.id];
                    if (ref) ref.openPopup();
                  }}>{marker.name}</li>
              ))}
          </ul>
        </div>
      </IonContent>
    </IonPage >
  );
};

export default Home;
