import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonTabs, IonTabBar, IonImg, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonFooter, IonButton } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import { obtenerUsuario } from '../services/firebaseFunctions';
import { useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import './Cuenta.css';

interface SlideData {
  id: number;
  title: string;
  image: string;
  description: string;
}

const slidesData: SlideData[] = [
  {
    id: 1,
    title: 'Italia',
    image: '../../assets/logo.png',
    description: 'Descripción detallada de Italia.'
  },
  {
    id: 2,
    title: 'Italia',
    image: '../../assets/logo.png',
    description: 'Descripción detallada de Italia.'
  },
  {
    id: 3,
    title: 'Italia',
    image: '../../assets/logo.png',
    description: 'Descripción detallada de Italia.'
  }
];

function Cuenta() {
  const [usuario, setUsuario] = useState({nombre: '', usuario: '' });
  useEffect(() => {
    const cargarUsuario = async () => {
      const usuarioId = localStorage.getItem("usuarioId");
      if (usuarioId) {
        const datosUsuario = await obtenerUsuario(usuarioId);
        setUsuario(datosUsuario);
      }
    };
    cargarUsuario();
  }, []);

const [activeSlide, setActiveSlide] = useState<SlideData | null>(null);

  return (
    <IonPage>
      <IonHeader>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet"></link>
      </IonHeader>
      <IonContent className='fondo'>
        <div className='MyAccount'> My account
        </div>
        <div className="profile-header">
          <img
            src="../../assets/user.png"
            alt="Foto de perfil"
            className="profile-image"
          />
          <div className="profile-info">
            <div className="profile-name">{usuario.nombre}</div>
            <div className="profile-rank">{usuario.usuario}</div>
          </div>
        </div>
        <div>
          <p className='fav-places'>My favorite places</p>
          <Swiper spaceBetween={10} slidesPerView={2} pagination={{ clickable: true }}>
            {slidesData.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="slide-box" onClick={() => setActiveSlide(slide)}>
                  <img className="img-fav-places" src={slide.image} alt={slide.title} />
                  <p className="name-fav-places">{slide.title} - {slide.id}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {activeSlide && (
            <div className="modal-overlay" onClick={() => setActiveSlide(null)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{activeSlide.title}</h2>
                <p>{activeSlide.description}</p>
                <button onClick={() => setActiveSlide(null)}>Cerrar</button>
              </div>
            </div>
          )}

        </div>
      </IonContent>
    </IonPage>
  );
}
export default Cuenta;