import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonTabs, IonTabBar, IonImg, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonFooter, IonButton } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';

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
    title: 'Francia',
    image: 'https://via.placeholder.com/300x200?text=Francia',
    description: 'Descripción detallada de Francia.'
  },
  {
    id: 3,
    title: 'Francia',
    image: 'https://via.placeholder.com/300x200?text=Francia',
    description: 'Descripción detallada de Francia.'
  }
];

function Cuenta() {
  const [activeSlide, setActiveSlide] = useState<SlideData | null>(null);
  return (
    <IonPage>
        <IonHeader>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet"></link>
        </IonHeader>
      <IonContent className='fondo'>
      <div className='MyAccount'> My account
        <IonButton className='settings'><img src="../../assets/settings.png" width='45px' height='45px'/></IonButton>
      </div>
      <div className="profile-header">
          <img
            src=""
            alt="Foto de perfil"
            className="profile-image"
          />
          <div className="profile-info">
            <div className="profile-name">Daira Helen Andrea</div>
            <div className="profile-rank">Recycler</div>
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