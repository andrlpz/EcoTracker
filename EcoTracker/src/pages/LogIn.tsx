import React from 'react';
import { IonContent, IonText, IonItem, IonCheckbox, IonHeader, IonPage, IonTitle, IonToolbar, IonTabs, IonTabBar, IonImg, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonFooter, IonButton, IonInput } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { Route, Redirect } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './LogIn.css';


function LogIn() {
  return (
    <IonPage>
      <IonHeader>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet"></link>
      </IonHeader>
      <IonContent className='bck'>
        <div className='log'>
          <img src="../../assets/logoDraw.png" />
        </div>
        <div className='rectangulo'>
          <p className='welcome'>Welcome</p>
        </div>
        <p className='name'>Name:</p>
        <div className='Nombre' /*SECCION DONDE SE INGRESA EL NOMBRE*/>
          <IonInput  /*DONDE SE INGRESA EL NOMBRE*/
            clearInput={true}
            fill='solid'
            id='InputNom'
            color={'warning'}
          ></IonInput>
        </div>
        <p className='pswd'>Password:</p>
        <div className='Password' /*SECCION DONDE SE INGRESA EL NOMBRE*/>
          <IonInput  /*DONDE SE INGRESA EL NOMBRE*/
            clearInput={true}
            fill='solid'
            id='InputPswd'
            color={'warning'}
          ></IonInput>
        </div>
        <div>
          <IonButton className='logIn'>Log in</IonButton>
        </div>


        <div>
          <p className='text'>Don't have an account?</p>
          <a className='signUp' href="/signup">Sign up</a>
        </div>
      </IonContent>
    </IonPage>
  );
}
export default LogIn;