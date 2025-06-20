import React from 'react';
import { useState } from 'react';
import { IonContent, IonText, IonItem, IonCheckbox, IonHeader, IonPage, IonTitle, IonToolbar, IonTabs, IonTabBar, IonImg, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonFooter, IonButton, IonInput } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useHistory } from 'react-router-dom';
import { Route, Redirect } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './LogIn.css';
import { verificarCredenciales } from "../services/firebaseFunctions.js"


const LogIn: React.FC = () => {

  const history = useHistory();
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = async () => {
    try {
      console.log("Usuario ingresado:", usuario);
      console.log("Contraseña ingresada:", contrasena);

      // Llama a la función verificar
      const usuarioAutenticado = await verificarCredenciales(usuario, contrasena);
      if (usuarioAutenticado) {
        setError(false);

        // guarda el usuario en localStorage
        localStorage.setItem("usuarioId", usuarioAutenticado.id);

        history.replace('/tabs/inicio'); // Redirige a la página de tabs
      } else {
        setError(true);
        console.log("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error durante el login:", error);
      setError(true);
    }
  };

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
        <p className='name'>Username:</p>
        <div className='Nombre' /*SECCION DONDE SE INGRESA EL NOMBRE*/>
          <IonInput  /*DONDE SE INGRESA EL NOMBRE*/
            clearInput={true}
            fill='solid'
            id='InputNom'
            onIonInput={(e: any) => setUsuario(e.target.value)}
          ></IonInput>
        </div>
        <p className='pswd'>Password:</p>
        <div className='Password' /*SECCION DONDE SE INGRESA EL NOMBRE*/>
          <IonInput  /*DONDE SE INGRESA EL NOMBRE*/
            clearInput={true}
            fill='solid'
            id='InputPswd'
            onIonInput={(e: any) => setContrasena(e.target.value)}

          ></IonInput>
        </div>
        <div>
          <IonButton className='logIn' onClick={handleLogin} >Log in</IonButton>
        </div>


        <div>
          <p className='text'>Don't have an account?</p>
          <a className='signUp' href="/signup">Sign up</a>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default LogIn;