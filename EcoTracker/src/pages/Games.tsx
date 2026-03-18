import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Games.css';

const Games: React.FC = () => {
  return (
    <IonPage>
      <IonContent style={{ '--background': '#f0f0e8' } as any} className="menu">
        <div className="div-title">
          <h1 className='title-games'>Games</h1>
          <p className="lead">Choose a game to review the topics from the information section.</p>
        </div>

        <div className="grid">
          <a className="card-games" href="/tabs/memorama">
            <div className="title">Memory Game</div>
            <div className="info">Match the trash with its corresponding category</div>
          </a>

          <a className="card-games" href="/tabs/conectar">
            <div className="title">Connect Plastics</div>
            <div className="info">Select and connect symbols with their description</div>
          </a>

          <a className="card-games" href="/tabs/preguntas">
            <div className="title">Clean Ocean</div>
            <div className="info">Answer questions to remove trash and save the ocean</div>
          </a>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Games;