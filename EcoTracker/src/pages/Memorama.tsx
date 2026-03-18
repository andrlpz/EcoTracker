import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import { useEffect, useState } from 'react';
import './Memorama.css';

const Memorama: React.FC = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [tries, setTries] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const cardPairs = [
      { id: 1, emoji: '🍌', label: 'Banana peel', type: 'material', color: '' },
      { id: 1, emoji: '🌱', label: 'Organic', type: 'category', color: '#4CAF50' },

      { id: 2, emoji: '🍾', label: 'Plastic bottle', type: 'material', color: '' },
      { id: 2, emoji: '♻️', label: 'Recyclable', type: 'category', color: '#2196F3' },

      { id: 3, emoji: '🔋', label: 'Batteries', type: 'material', color: '' },
      { id: 3, emoji: '⚠️', label: 'Hazardous', type: 'category', color: '#F44336' },

      { id: 4, emoji: '📰', label: 'Newspaper', type: 'material', color: '' },
      { id: 4, emoji: '📦', label: 'Paper / Cardboard', type: 'category', color: '#8B4513' },

      { id: 5, emoji: '🥫', label: 'Can', type: 'material', color: '' },
      { id: 5, emoji: '🔗', label: 'Metal', type: 'category', color: '#9E9E9E' },

      { id: 6, emoji: '🍺', label: 'Glass bottle', type: 'material', color: '' },
      { id: 6, emoji: '🟦', label: 'Glass', type: 'category', color: '#00BCD4' },
    ];

    const shuffled = cardPairs.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setTries(0);
    setGameWon(false);
  };

  const handleCardClick = (index: number) => {
    if (flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setTries((t) => t + 1);

      if (cards[newFlipped[0]].id === cards[newFlipped[1]].id) {
        setMatched((m) => [...m, ...newFlipped]);
        setFlipped([]);

        if (matched.length + 2 === cards.length) {
          setGameWon(true);
        }
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
      }
    }
  };

  return (
    <IonContent style={{ '--background': '#f0f0e8' } as any} className="memorama-container">
  <div className="memorama-container">
    <h1>Recycling Memory Game</h1>

    <div style={{ padding: '0 20px 12px 20px', textAlign: 'center' }}>
      <p style={{ margin: 0, color: '#36353a', fontSize: 14 }}>
        Match each material with its recycling category.
      </p>
    </div>

    <div className="memorama-controls">
      <span id="tries">Tries: <strong>{tries}</strong></span>
      <button onClick={initializeGame} className="memorama-btn-reset">Reset</button>
    </div>

    <div className="memorama-game" id="memorama-game">
      {cards.map((card, index) => (
        <button
          key={index}
          className={`memorama-card ${card.type} ${flipped.includes(index) || matched.includes(index) ? 'memorama-card--flipped' : ''}`}
          style={
            (flipped.includes(index) || matched.includes(index)) && card.type === 'category'
              ? { backgroundColor: card.color }
              : {}
          }
          onClick={() => handleCardClick(index)}
        >
          {flipped.includes(index) || matched.includes(index) ? (
            <div className="memorama-card__content">
              <div className="memorama-card__emoji">{card.emoji}</div>
              <div className="memorama-card__label">{card.label}</div>
            </div>
          ) : (
            <div className="memorama-card__content">
              <div className="memorama-card__question">?</div>
            </div>
          )}
        </button>
      ))}
    </div>
  </div>

  {gameWon && (
    <div className="memorama-overlay" id="memorama-win">
      <div className="memorama-popup">
        <h2>Congratulations!</h2>
        <p>You completed the game in <strong>{tries}</strong> tries.</p>
        <button onClick={initializeGame} className="memorama-btn-reset">Play again</button>
      </div>
    </div>
  )}
</IonContent>
  );
};

export default Memorama;