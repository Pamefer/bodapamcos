import { useEffect, useRef, useState } from 'react';
import principalPic from './static/DSC_0817.jpg';
// import manos from './static/DSC_0892.jpg';
import rascacielo from './static/rascacielo.jpg';
import anillos from './static/anillos.png';
import bola from './static/bola.png';
import lapromesa from './static/lapromesa.mp3';
import './App.css';
import Carousel from './Carousel';

const Pause = ({ onPlayerClick }) => {
  return (
    <svg className="buttonMusic" viewBox="0 0 60 60" onClick={onPlayerClick}>
      <polygon points="0,0 15,0 15,60 0,60" />
      <polygon points="25,0 40,0 40,60 25,60" />
    </svg>
  )
}

const Play = ({ onPlayerClick }) => {
  return (
    <svg className="buttonMusic" viewBox="0 0 60 60" onClick={onPlayerClick}>
      <polygon points="0,0 50,30 0,60" />
    </svg>
  )
}
function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // 🔁 Handles user interaction anywhere to auto-play
  useEffect(() => {
    const handleUserInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.log('Autoplay blocked:', err));
        setHasInteracted(true);
      }
    };

    // Listen for any click on the document
    document.addEventListener('click', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
    };
  }, [hasInteracted]);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          console.log("playing")
          setIsPlaying(true);
          setHasInteracted(true); // mark interaction so autoplay won't retry
        })
        .catch(err => console.log('Play failed:', err));
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header"></header>

      <audio ref={audioRef} loop preload="metadata">
        <source src={lapromesa} />
      </audio>

      <div className="firstSection">
        <img src={principalPic} alt="pameycos" className="background-image" />

        <div className="audio-controls">
          {isPlaying ? <Pause onPlayerClick={handlePause} /> : <Play onPlayerClick={handlePlay} />}
        </div>
        <div className="namesdate">
          <div className="namesContainer">
            {/* <p>PAME</p>
            <p>&</p>
            <p>COSME</p> */}
            <p>Pame</p>
            <p>&</p>
            <p>Cosme</p>
          </div>
          <p className="dateFirst">09 · 03 · 2025</p>
        </div>

        <div className="quoteContainer">
          <p className="quotePhrase">Lo que Dios ha unido</p>
          <p className="quotePhrase">que no lo separe el hombre</p>
          <p className="mateo">- MATEO 19:6 -</p>
        </div>
      </div>

      <div className="secondSection">
        <p>Y despues de algunos años, empieza el "para siempre" que tanto hemos soñado...</p>
        <div >
          <img src={rascacielo} alt="manos" className="centralPic"></img>

        </div>
        <p>
          Tenemos el honor de invitarte a
        </p>
        <div className="nuestraBoda">
          <p className="line-start">Nuestra</p>
          <p className="line-end">Boda</p>
        </div>
        <p>Con la bendicion de nuestros padres a la distancia</p>
        <div className="normalBlock">
          <p>Jose Guaman</p>
          <p>Rosa Cañar</p>
        </div>
        <div className="normalBlock">
          <p>Cosme Guerrero</p>
          <p>Blanca Riofrio</p>
        </div>
      </div>
      <div className="thirdSection">
        <h2>Ceremonia y Recepción</h2>
        <p>Sábado, 13 de septiembre</p>
        <p>4:00 PM</p>
        <div className="normalBlock">
          <p>Kearny, New Jersey</p>
          <p>476 Devon St.</p>
        </div>

        <a
          href="https://www.google.com/maps/place/476+Devon+St,+Kearny,+NJ+07032"
          target="_blank"
          rel="noopener noreferrer"
          class="maps-button"
        >
          📍 Ver ubicación
        </a>

        <div className="iconos">
          <img src={anillos} alt="anillos" ></img>
        </div>

      </div>
      <Carousel />
      <div className="thirdSection">

        <div className="iconos">
          <img src={bola} alt="bola"></img>
        </div>
      </div>


    </div>
  );
}

export default App;
