import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonHeader } from '@ionic/react';
import './Preguntas.css';

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

interface ShuffledQuestion {
  question: string;
  options: string[];
  correct: number;
}

const shuffleQuestions = (questions: ShuffledQuestion[]): ShuffledQuestion[] => {
  const shuffledQuestions = shuffleArray(questions);
  
  return shuffledQuestions.map(q => {
    const optionsWithIndex = q.options.map((opt, idx) => ({
      text: opt,
      wasCorrect: idx === q.correct
    }));
    
    const shuffledOptions = shuffleArray(optionsWithIndex);
    const newCorrectIndex = shuffledOptions.findIndex(opt => opt.wasCorrect);
    
    return {
      question: q.question,
      options: shuffledOptions.map(opt => opt.text),
      correct: newCorrectIndex
    };
  });
};

const Preguntas: React.FC = () => {
  const [lives, setLives] = useState(3);
  const [progress, setProgress] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [visibleLayers, setVisibleLayers] = useState(5);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctAnswered, setCorrectAnswered] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<ShuffledQuestion[]>([]);

  const trashEmojis = ['🍔', '🍕', '🥤', '🍜', '🎂', '🍓', '🥫', '🍺', '☕', '🧁'];

  const allQuestions: ShuffledQuestion[] = [
    {
      question: 'How much energy does recycling aluminum save compared to making it from raw ore?',
      options: ['25% of energy', '95% of energy', '50% of energy'],
      correct: 1,
    },
    {
      question: 'What is the main benefit of reducing waste generation?',
      options: ['Prevents overfilled landfills and reduces pollution', 'Saves money only', 'Looks good aesthetically'],
      correct: 0,
    },
    {
      question: 'How much CO₂ can reusing glass cullet save per ton?',
      options: ['100 kg of CO₂', 'Over 300 kg of CO₂', '50 kg of CO₂'],
      correct: 1,
    },
    {
      question: 'How much less air pollution does recycling paper produce compared to raw pulp?',
      options: ['35% less', '50% less', '74% less'],
      correct: 2,
    },
    {
      question: 'According to the Ellen MacArthur Foundation, reuse reduces greenhouse gas emissions how much more than recycling?',
      options: ['30% more', '88% more', '50% more'],
      correct: 1,
    },
    {
      question: 'How many coal power plants could be shut down by 2030 with a zero-waste strategy?',
      options: ['50 plants', '80 plants', '100 plants'],
      correct: 1,
    },
    {
      question: 'How much wood does recycling one ton of office paper save?',
      options: ['One ton', 'Over two tons', 'Half a ton'],
      correct: 1,
    },
    {
      question: 'How much water pollution does recycling paper reduce compared to making it from raw pulp?',
      options: ['20% less', '35% less', '50% less'],
      correct: 1,
    },
    {
      question: 'By how much can reusing glass reduce energy used for melting?',
      options: ['Up to 15%', 'Up to 30%', 'Up to 50%'],
      correct: 1,
    },
    {
      question: 'How many metric tons of CO₂-equivalent emissions did U.S. recycling and composting avoid in 2018?',
      options: ['100 million', '193 million', '250 million'],
      correct: 1,
    },
    {
      question: 'What does reusing materials help preserve for future generations?',
      options: ['Only energy', 'Finite natural resources', 'Just money'],
      correct: 1,
    },
    {
      question: 'What harmful gas is released from overfilled landfills?',
      options: ['Oxygen', 'Methane', 'Nitrogen'],
      correct: 1,
    },
    {
      question: 'By what percentage could global reuse models reduce emissions in key sectors?',
      options: ['Up to 50%', 'Up to 80%', 'Up to 30%'],
      correct: 1,
    },
  ];

  const questions = shuffleArray(allQuestions).slice(0, 5);

  useEffect(() => {
    setShuffledQuestions(shuffleQuestions(questions));
    resetGame();
  }, []);

  const handleAnswer = (selectedIndex: number) => {
    if (answered && !correctAnswered) return;

    setSelectedAnswer(selectedIndex);
    setAnswered(true);

    if (selectedIndex === shuffledQuestions[currentQuestion].correct) {
      setCorrectAnswered(true);
      setTimeout(() => {
        setVisibleLayers((l) => Math.max(0, l - 1));
        setProgress((p) => p + 1);

        if (progress + 1 === shuffledQuestions.length) {
          setTimeout(() => setGameWon(true), 600);
        } else {
          nextQuestion();
        }
      }, 1200);
    } else {
      setLives((l) => {
        const newLives = l - 1;
        if (newLives <= 0) {
          setTimeout(() => setGameLost(true), 800);
        }
        return newLives;
      });
      setTimeout(() => {
        setSelectedAnswer(null);
        setAnswered(false);
      }, 800);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setAnswered(false);
    setCorrectAnswered(false);
    setCurrentQuestion((c) => Math.min(c + 1, shuffledQuestions.length - 1));
  };

  const resetGame = () => {
    setLives(3);
    setProgress(0);
    setCurrentQuestion(0);
    setGameWon(false);
    setGameLost(false);
    setVisibleLayers(5);
    setSelectedAnswer(null);
    setAnswered(false);
    setCorrectAnswered(false);
    setShuffledQuestions(shuffleQuestions(questions));
  };

  const generateTrashLayer = (layerIndex: number) => {
    const trash: React.ReactNode[] = [];
    const itemsPerLayer = 12;

    for (let i = 0; i < itemsPerLayer; i++) {
      trash.push(
        <div
          key={`${layerIndex}-${i}`}
          className={`trash-item-preguntas layer-${layerIndex}`}
          style={{
            left: `${(i * 100) / itemsPerLayer + Math.random() * 5}%`,
            top: `${20 + layerIndex * 12 + Math.random() * 8}%`,
          }}
        >
          {trashEmojis[Math.floor(Math.random() * trashEmojis.length)]}
        </div>
      );
    }
    return trash;
  };

  if (gameWon) {
    return (
      <IonPage>
        <IonContent className="preguntas-container" style={{ '--background': '#F3E3FF' } as any}>
          <div className="page-preguntas">
            <div className="overlay-preguntas">
              <div className="modal-preguntas">
                <h2>Ocean is clean!</h2>
                <p>The whales are happy thanks to your help.</p>
                <button onClick={resetGame} className="btn-modal">Play again</button>
              </div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  if (gameLost) {
    return (
      <IonPage>
        <IonContent className="preguntas-container" style={{ '--background': '#F3E3FF' } as any}>
          <div className="page-preguntas">
            <div className="overlay-preguntas">
              <div className="modal-preguntas">
                <h2>Game Over</h2>
                <p>You lost all lives. Try again to save the whale.</p>
                <button onClick={resetGame} className="btn-modal">Try again</button>
              </div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  if (!shuffledQuestions.length) {
    return null;
  }

  return (
    <IonPage>
      <IonContent className="preguntas-container" style={{ '--background': '#f0f0e8' } as any}>
        <div className="page-preguntas">
          <header>
            <h1>Clean the Ocean</h1>
            <div className="hud-preguntas">
              <div className="lives-preguntas">Lives: <span id="lives">{'❤️'.repeat(lives)}</span></div>
              <div className="progress-preguntas">Trash removed: <span id="progress">{progress}</span>/{shuffledQuestions.length}</div>
              <button id="restart" onClick={resetGame} className="btn-restart-preguntas">Restart</button>
            </div>
          </header>

          <main>
            <div id="ocean" className="ocean-preguntas">
              {Array.from({ length: visibleLayers }).map((_, layerIndex) => (
                <div
                  key={layerIndex}
                  className={`trash-layer-preguntas layer-${layerIndex}`}
                >
                  {generateTrashLayer(layerIndex)}
                </div>
              ))}
            </div>

            <section className="question-panel-preguntas">
              <div id="question" className="question-preguntas">{shuffledQuestions[currentQuestion].question}</div>
              <div id="options" className="options-preguntas">
                {shuffledQuestions[currentQuestion].options.map((option, index) => {
                  let buttonClass = 'opt-preguntas';
                  
                  if (answered && selectedAnswer === index && index !== shuffledQuestions[currentQuestion].correct) {
                    buttonClass += ' wrong';
                  }

                  if (correctAnswered && index === shuffledQuestions[currentQuestion].correct) {
                    buttonClass += ' correct';
                  }

                  return (
                    <button
                      key={index}
                      className={buttonClass}
                      onClick={() => handleAnswer(index)}
                      disabled={answered && !correctAnswered}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </section>
          </main>

          <div className="instructions-preguntas">
            <p>Answer correctly to remove trash and clean the ocean.</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Preguntas;