import React from 'react';
import { IonContent, IonToggle, IonInput, IonCheckbox, IonHeader, IonPage, IonTitle, IonToolbar, IonTabs, IonTabBar, IonImg, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonFooter, IonButton } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { Route, Redirect } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './SignUp.css';


function SignUp() {
  return (
    <IonPage>
      <IonHeader>
              <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet"></link>
            </IonHeader>
            <IonContent className='fondo'>
            <div className='log'>
              <img src="../../assets/logoDraw.png" />
            </div>
            <div className='rectangulo'>
              <p className='text1'>Get started</p>
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
            <p className='mail'>Mail:</p>
            <div className='Mail' /*SECCION DONDE SE INGRESA EL NOMBRE*/> 
                      <IonInput  /*DONDE SE INGRESA EL NOMBRE*/
                        clearInput={true}
                        fill='solid'
                        id='InputMail'
                        color={'warning'}
                        ></IonInput>
            </div>
            <p className='pswd2'>Password:</p>
            <div className='Password2' /*SECCION DONDE SE INGRESA EL NOMBRE*/> 
                      <IonInput  /*DONDE SE INGRESA EL NOMBRE*/
                        clearInput={true}
                        fill='solid'
                        id='InputPswd2'
                        color={'warning'}
                        ></IonInput>
                  </div>
            <div>
            <IonToggle checked={true} className='permission'>Share my location</IonToggle>
            </div>
            <div>
              <IonButton className='SignUp'>Sign Up</IonButton>
            </div>
            <p className='txsign'>Sign up with</p>
            <div>
              <IonButton className='google2'><img src="../../assets/google.png" width='50px' height='50px'/></IonButton>
            </div>
      
      
            <div> 
            <p className='text2'>Already have an account?</p>
            <a className='textLog' href="/logIn">Log in</a>
            </div>
            </IonContent>
    </IonPage>
  );
}
export default SignUp;