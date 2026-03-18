import { IonContent, IonHeader, IonPage, IonButton, useIonViewWillEnter } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useEffect } from 'react';
import { obtenerUsuario } from '../services/firebaseFunctions';
import 'swiper/css';
import 'swiper/css/pagination';
import './Cuenta.css';
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useHistory } from 'react-router-dom';

interface SlideData {
  id: number;
  name: string;
  photo: string;
  materials: Array<string>;
  instructions: string;
  bussinessHours: string;
  facilities: string;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  contact: string;
  address: string;
}

const languages = [
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
  },
  {
    code: 'es',
    name: 'Español',
    flag: '🇪🇸',
  }
];

function Cuenta() {
  const [usuario, setUsuario] = useState<any>(null);
  const [slidesData, setSlidesData] = useState<SlideData[]>([]);
  const [activeSlide, setActiveSlide] = useState<SlideData | null>(null);
  const [cargando, setCargando] = useState(true);
  const [currentLanguageCode, setCurrentLanguageCode] = useState('es');

  const { t, i18n } = useTranslation();
  const history = useHistory();
  const auth = getAuth();

  // Inicializar el idioma al montar el componente
  useEffect(() => {
    const savedLanguage = cookies.get('i18next') || 'es';
    setCurrentLanguageCode(savedLanguage);
    if (i18n.language !== savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = async (languageCode: string) => {
    try {
      await i18n.changeLanguage(languageCode);
      cookies.set('i18next', languageCode, { expires: 365 });
      setCurrentLanguageCode(languageCode);
      console.log('Idioma cambiado a:', languageCode);
    } catch (error) {
      console.error('Error cambiando idioma:', error);
    }
  };

  const cerrarSesion = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem("usuarioId");
      history.push('/login');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Escuchar cambios en la autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setCargando(true);
      if (firebaseUser) {
        console.log("Usuario autenticado:", firebaseUser.email);
        console.log("UID:", firebaseUser.uid);

        try {
          const datosUsuario = await obtenerUsuario(firebaseUser.uid);
          setUsuario(datosUsuario);

          if (datosUsuario?.savedSites) {
            setSlidesData(
              datosUsuario.savedSites.map((site: any) => ({
                id: site.id,
                name: site.name,
                photo: site.photo,
                materials: site.materials,
                instructions: site.instructions,
                bussinessHours: site.bussinessHours,
                facilities: site.facilities,
                monday: site.monday,
                tuesday: site.tuesday,
                wednesday: site.wednesday,
                thursday: site.thursday,
                friday: site.friday,
                saturday: site.saturday,
                sunday: site.sunday,
                contact: site.contact,
                address: site.address
              }))
            );
          }
        } catch (error) {
          console.error("Error al obtener usuario:", error);
        }
      } else {
        console.log("No hay usuario autenticado");
        history.push('/login');
      }
      setCargando(false);
    });

    return () => unsubscribe();
  }, [auth, history]);

  if (cargando) {
    return (
      <IonPage>
        <IonContent className='fondo'>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <p>Cargando...</p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet"></link>
      </IonHeader>
      <IonContent className='fondo'>
        <div className='MyAccount'> My account</div>

        <div className="profile-header">
          <div className='profile-user'>
            <img
              src="../../assets/user.png"
              alt="Foto de perfil"
              className="profile-image"
            />
            <div className="profile-info">
              <div className="profile-name">{usuario?.nombre || 'Usuario'}</div>
              <div className="profile-rank">{usuario?.usuario || auth.currentUser?.email}</div>
            </div>
          </div>
          <IonButton onClick={cerrarSesion} className="logout-button">
            Cerrar Sesión
          </IonButton>
          <div className="language-selector-container">
            <div className="language-selector-wrapper">
              <label className="language-label">
                {t('language') || 'Idioma'}
              </label>
              <div className="language-buttons-container">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`language-button ${currentLanguageCode === language.code ? 'active' : ''}`}
                  >
                    <span className="language-flag">{language.flag}</span>
                    <span className="language-name">{language.name}</span>
                    {currentLanguageCode === language.code && (
                      <div className="language-indicator"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>



        <div>
          <p className='fav-places'>My recycling spots</p>
          <Swiper spaceBetween={10} slidesPerView={2} pagination={{ clickable: true }}>
            {slidesData.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="slide-box" onClick={() => setActiveSlide(slide)}>
                  <img className="img-fav-places" src={slide.photo || "/assets/logo.png"} />
                  <p className="name-fav-places">{slide.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {activeSlide && (
            <div className="modal-overlay" onClick={() => setActiveSlide(null)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className='popup-content'>
                  <div className='popup-header'>
                    <p className='name-site'>{activeSlide.name}</p>
                  </div>
                  <img src={activeSlide.photo || '/assets/logo.png'} />
                  <p className='modal-content-text'>
                    <strong>Address: </strong>{activeSlide.address || 'No address available.'}
                  </p>
                  <p className='modal-content-text'>
                    <strong>Bussiness Hours: </strong>{activeSlide.bussinessHours || 'No bussiness hours available.'}
                  </p>
                  <div className='div-days'>
                    {activeSlide.sunday ? <img src="../../assets/sundayopen.png" className='day-open' /> : <img src="../../assets/sunday.png" className='day-icon' />}
                    {activeSlide.monday ? <img src="../../assets/mondayopen.png" className='day-open' /> : <img src="../../assets/monday.png" className='day-icon' />}
                    {activeSlide.tuesday ? <img src="../../assets/tuesdayopen.png" className='day-open' /> : <img src="../../assets/tuesday.png" className='day-icon' />}
                    {activeSlide.wednesday ? <img src="../../assets/wednesdayopen.png" className='day-open' /> : <img src="../../assets/wednesday.png" className='day-icon' />}
                    {activeSlide.thursday ? <img src="../../assets/thursdayopen.png" className='day-open' /> : <img src="../../assets/thursday.png" className='day-icon' />}
                    {activeSlide.friday ? <img src="../../assets/fridayopen.png" className='day-open' /> : <img src="../../assets/friday.png" className='day-icon' />}
                    {activeSlide.saturday ? <img src="../../assets/saturdayopen.png" className='day-open' /> : <img src="../../assets/saturday.png" className='day-icon' />}
                  </div>
                  <p className='modal-content-text'>
                    <strong>Materials: </strong>{activeSlide.materials && activeSlide.materials.join(', ')}.
                  </p>
                  <p className='modal-content-text'>
                    <strong>Instructions: </strong>{activeSlide.instructions || 'No specific instructions available.'}
                  </p>
                  <p className='modal-content-text'>
                    <strong> Facilities: </strong>{activeSlide.facilities || 'No information available.'}
                  </p>
                  <p className='modal-content-text'>
                    <strong>Contact: </strong>{activeSlide.contact || 'No contact available.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Cuenta;