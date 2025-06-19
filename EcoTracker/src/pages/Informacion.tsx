import React from 'react';
import { IonContent, useIonRouter, IonPage, IonCard, IonCardContent, IonIcon } from '@ionic/react';
import { playCircle } from 'ionicons/icons';
import './Informacion.css';

const temas = [
  {
    titulo: 'IMPORTANCE OF RECYCLING',
    descripcion: 'In this lesson you will learn about why and what to recycle',
    imagen: 'assets/recycling1.png',
  },
  {
    titulo: 'RECYCLING BINS',
    descripcion: 'In this lesson you will learn about the function of each type of bin',
    imagen: 'assets/recycling2.png',
  },
  {
    titulo: 'RECYCLING SYMBOLS',
    descripcion: 'In this lesson you will learn about the most common and important recycling symbols',
    imagen: 'assets/recycling3.png',
  },
];

const Informacion: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet"></link>
      <IonContent className="ion-padding" style={{ '--ion-background-color': '#F0F0E9' }}>
        <div className='temas'> LEARN TO RECYCLE
        </div>
        <div className='logoTemas'>
          <img src="../../assets/logoDraw.png" />
        </div>
        {temas.map((tema, index) => (
          <IonCard
            key={index}
            button
            className="recycling-tema"
            onClick={() => {
              if (index === 0) {
                router.push('/tabs/elemento/1', 'forward');
              } else if (index === 1) {
                router.push('/tabs/elemento/2', 'forward');
              } else if (index === 2) {
                router.push('/tabs/elemento/3', 'forward');
              } else {
                router.push(`/tabs/elemento/${index + 1}`, 'forward');
              }
            }}
          >
            <div
              className="tema-background"
              style={{ backgroundImage: `url(${tema.imagen})` }}
            >
              <div className="overlay">
                <IonCardContent className="text-content">
                  <h2>{tema.titulo}</h2>
                  <p>{tema.descripcion}</p>
                  <IonIcon icon={playCircle} className="play-icon" />
                </IonCardContent>
              </div>
            </div>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Informacion;