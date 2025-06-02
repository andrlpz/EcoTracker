import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import './Home.css';
import { playCircle, radio, library, search } from 'ionicons/icons';

const Home: React.FC = () => {
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
        <IonFooter>
          <div className='div-footer'></div>
        </IonFooter>
      </IonContent>
    </IonPage>
  );
};

export default Home;
