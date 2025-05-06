import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonTabs, IonTabBar, IonImg, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonFooter, IonButton } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { Route, Redirect } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Inicio.css';


function Inicio() {
  return (
    <IonPage>
      <IonContent className='fondo'>
      <div className='logo'>
        <img src="../../assets/logo.png" />
      </div>  
      </IonContent>
    </IonPage>
  );
}
export default Inicio;