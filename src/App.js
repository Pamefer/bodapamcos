import { useEffect, useRef, useState } from 'react';
import principalPic from './static/DSC_0817.jpg';
import rascacielo from './static/DSC_0892.jpg';
import nieve from './static/w3.jpg';
// import rascacielo from './static/rascacielo.jpg';
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
            <p>Pame & Cosme</p>
          </div>
        </div>

        <div className="quoteContainer">
          <p className="quotePhrase">Nos Casamos!</p>
          <p className="dateFirst">09 · 03 · 2025</p>

          {/* <p className="quotePhrase">Lo que Dios ha unido</p>
          <p className="quotePhrase">que no lo separe el hombre</p>
          <p className="mateo">- MATEO 19:6 -</p> */}
        </div>
      </div>

      <div className="secondSection normalText">
        {/* <p>Y despues de algunos años, empieza el "para siempre" que tanto hemos soñado...</p> */}
        <p>Lo que empezó como una amistad creció con el tiempo... se volvió complicidad, amor, y ahora, un para siempre.</p>
        <div >
          <img src={nieve} alt="manos" className="centralSquare"></img>
        </div>
        <p>
          Con la promesa más sincera: elegirnos cada día
        </p>
        <p>
          Tenemos el agrado de invitarte a
        </p>
        <div className="nuestraBoda">
          <p className="cursiveTextMea line-start">Nuestra</p>
          <p className=" cursiveTextMea line-end">Boda</p>
        </div>

        <p>Te esperamos para ser parte de este instante eterno</p>
        <div >
          <img src={rascacielo} alt="manos" className="centralCircle"></img>
        </div>
      </div>
      <div className="thirdSection normalText">
        <p className="cursiveTextMea">Ceremonia y Recepción</p>

        <div className="textDobleColumn">
          <div className="iconos">
            <img src={anillos} alt="anillos" ></img>
          </div>
          <div>
            <p>Sábado, 13 de septiembre</p>
            <p>4:00 PM</p>
            <p className="smallText">476 Devon St. Kearny, New Jersey</p>
          </div>

        </div>

        <a
          href="https://www.google.com/maps/place/476+Devon+St,+Kearny,+NJ+07032"
          target="_blank"
          rel="noopener noreferrer"
          className="maps-button"
        >
          Ver ubicación
        </a>



      </div>
      <Carousel />
      <div className="thirdSection">

        <div className="iconos">
          <img src={bola} alt="bola"></img>
        </div>
      </div>

      <p></p>
    </div>
  );
}

export default App;
