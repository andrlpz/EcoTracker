import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonTabs, IonTabBar, IonImg, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonFooter, IonButton, useIonViewWillEnter } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import { obtenerUsuario } from '../services/firebaseFunctions';
import { useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import './Cuenta.css';

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

function Cuenta() {
  const [usuario, setUsuario] = useState({ nombre: '', usuario: '', savedSites: [] });
  const [slidesData, setSlidesData] = useState<SlideData[]>([]);
  const [activeSlide, setActiveSlide] = useState<SlideData | null>(null);

  useIonViewWillEnter(() => {
    const cargarUsuario = async () => {
      const usuarioId = localStorage.getItem("usuarioId");
      if (usuarioId) {
        const datosUsuario = await obtenerUsuario(usuarioId);
        setUsuario(datosUsuario);
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
    };
    cargarUsuario();
  }, []);

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
          <p className='fav-places'>My recycling spots</p>
          <Swiper spaceBetween={10} slidesPerView={2} pagination={{ clickable: true }}>
            {slidesData.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="slide-box" onClick={() => { setActiveSlide(slide); console.log("activeSlide:", slide); }}>
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
                    {activeSlide.sunday && <img src="../../assets/sundayopen.png" className='day-open' /> || <img src="../../assets/sunday.png" className='day-icon' />}
                    {activeSlide.monday && <img src="../../assets/mondayopen.png" className='day-open' /> || <img src="../../assets/monday.png" className='day-icon' />}
                    {activeSlide.tuesday && <img src="../../assets/tuesdayopen.png" className='day-open' /> || <img src="../../assets/tuesday.png" className='day-icon' />}
                    {activeSlide.wednesday && <img src="../../assets/wednesdayopen.png" className='day-open' /> || <img src="../../assets/wednesday.png" className='day-icon' />}
                    {activeSlide.thursday && <img src="../../assets/thursdayopen.png" className='day-open' /> || <img src="../../assets/thursday.png" className='day-icon' />}
                    {activeSlide.friday && <img src="../../assets/fridayopen.png" className='day-open' /> || <img src="../../assets/friday.png" className='day-icon' />}
                    {activeSlide.saturday && <img src="../../assets/saturdayopen.png" className='day-open' /> || <img src="../../assets/saturday.png" className='day-icon' />}
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