import { useEffect, useRef, useState } from 'react';

import principalPic from './static/DSC_0817.jpg';
import lapromesa from './static/lapromesa.mp3';
import './App.css';



function App() {
  const audioRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const handleUserInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.log('Autoplay failed:', err);
        });
        setHasInteracted(true);
        // Remove event listener after first interaction
        document.removeEventListener('click', handleUserInteraction);
      }
    };

    document.addEventListener('click', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
    };
  }, [hasInteracted]);
  return (
    <div className="App">
      <header className="App-header">

      </header>
      <audio ref={audioRef} loop className="framer-audio" preload="metadata" autoPlay>
        <source src={lapromesa}></source>
      </audio>
      <div class="hero-section">
        <img src={principalPic} alt="pameycos" class="background-image" />

        <div class="names">
          <p>PAME</p>
          <p>&</p>
          <p>COSME</p>
        </div>

        <div class="quote">
          <p class="quotep">Lo que Dios ha unido</p>
          <p class="quotep">que no lo separe el hombre</p>
          <p>- MATEO 19:6 -</p>
        </div>
      </div>
    </div>
  );
}

export default App;
