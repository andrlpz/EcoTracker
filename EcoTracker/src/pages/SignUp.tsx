import React from 'react';
import { IonContent, IonToggle, IonInput, IonCheckbox, IonHeader, IonPage, IonTitle, IonToolbar, IonTabs, IonTabBar, IonImg, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonFooter, IonButton } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { registrarUsuario } from "../services/firebaseFunctions.js";
import { Route, Redirect } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './SignUp.css';


function SignUp() {
  const [registro, setRegistro] = useState({
    nombre: "",
    usuario: "",
    contrasena: "",
    savedSites: [],
  });

  const [error, setError] = useState(false);
  const history = useHistory();

  const irALogIn = () => {
    history.push('/login');
  };

  const registroUsuario = () => {
    const nombre = (document.getElementById('InputNom') as HTMLInputElement)?.value;
    const usuario = (document.getElementById('InputMail') as HTMLInputElement)?.value;
    const contrasena = (document.getElementById('InputPswd2') as HTMLInputElement)?.value;

    const nuevoRegistro = {
      ...registro,
      nombre,
      usuario,
      contrasena,
    };

    console.log(nuevoRegistro);

    if (nombre !== "" && usuario !== "" && contrasena !== "") {
      setError(false);
      registrarUsuario(nuevoRegistro);
      irALogIn();
    } else {
      setError(true);
    }
  };

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
            onIonChange={(e: any) => setRegistro({ ...registro, nombre: e.target.value })}
          ></IonInput>
        </div>
        <p className='mail'>Username:</p>
        <div className='Mail' /*SECCION DONDE SE INGRESA EL NOMBRE*/>
          <IonInput  /*DONDE SE INGRESA EL NOMBRE*/
            clearInput={true}
            fill='solid'
            id='InputMail'
            color={'warning'}
            onIonChange={(e: any) => setRegistro({ ...registro, usuario: e.target.value })}
          ></IonInput>
        </div>
        <p className='pswd2'>Password:</p>
        <div className='Password2' /*SECCION DONDE SE INGRESA EL NOMBRE*/>
          <IonInput  /*DONDE SE INGRESA EL NOMBRE*/
            clearInput={true}
            fill='solid'
            id='InputPswd2'
            color={'warning'}
            onIonChange={(e: any) => setRegistro({ ...registro, contrasena: e.target.value })}
          ></IonInput>
        </div>
        <div>
          <IonToggle checked={true} className='permission'>Share my location</IonToggle>
        </div>
        <div>
          <IonButton className='SignUp' onClick={registroUsuario}>Sign Up</IonButton>
          {error === true &&
            <h1> Todos los datos son obligatorios</h1>
          }
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