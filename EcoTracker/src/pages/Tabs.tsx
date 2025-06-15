import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { mapOutline, informationCircleOutline, personCircleOutline } from 'ionicons/icons';
import Home from './Home';
import Informacion from './Informacion';
import Cuenta from './Cuenta';
import Elemento1 from './Elemento1';
import Elemento2 from './Elemento2';
import './Tabs.css';

const Tabs: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route exact path="/tabs/mapa" component={Home} />
      <Route exact path="/tabs/informacion" component={Informacion} />
      <Route exact path="/tabs/cuenta" component={Cuenta} />
      <Redirect exact from="/tabs" to="/tabs/mapa" />
      <Route exact path="/tabs/elemento/1" component={Elemento1} />
      <Route exact path="/tabs/elemento/2" component={Elemento2} />
      <Redirect exact from="/tabs" to="/tabs/mapa" />
    </IonRouterOutlet>

    <IonTabBar slot="bottom" className="custom-tab-bar">
      <IonTabButton tab="mapa" href="/tabs/mapa">
        <IonIcon icon={mapOutline} />
        <IonLabel>Map</IonLabel>
      </IonTabButton>
      <IonTabButton tab="informacion" href="/tabs/informacion">
        <IonIcon icon={informationCircleOutline} />
        <IonLabel>Information</IonLabel>
      </IonTabButton>
      <IonTabButton tab="cuenta" href="/tabs/cuenta">
        <IonIcon icon={personCircleOutline} />
        <IonLabel>Account</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default Tabs;