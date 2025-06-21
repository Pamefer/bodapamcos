import { useEffect, useRef, useState } from 'react';
import principalPic from './static/portada.jpg';
import anillospic from './static/DSC_0892.jpg';
import nieve from './static/w3.jpg';

import anillos from './static/anillos.png';
import bola from './static/bola.png';
import manitos from './static/DSC_0932.jpg';

import lapromesa from './static/lapromesa.mp3';
import './App.css';
import Carousel from './Carousel';
import { motion } from 'framer-motion';
import foto8 from './static/DSC_0884.jpg';
import foto9 from './static/DSC_0868.jpg';
import foto10 from './static/DSC_0824.jpg';
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

  const text = "¡Nos casamos!";
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };
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
          <motion.p
            variants={container}
            initial="hidden"
            animate="visible"
            className="quotePhrase"
          >
            {letters.map((char, index) => (
              <motion.span key={index} variants={child}>
                {char}
              </motion.span>
            ))}
          </motion.p>
          <p className="dateFirst">09 · 03 · 2025</p>
        </div>
      </div>

      <div className="secondSection normalText">
        <div className="iconos">
          <motion.img
            src={anillos}
            alt="manos"
            initial={{ opacity: 0, rotate: -10, scale: 0.95 }}
            whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 5.1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
          />
        </div>
        <p>Lo que empezó como una amistad creció con el tiempo... se volvió complicidad, amor, y ahora, un para siempre.</p>
        <div >
          <motion.img
            className="centralSquare"
            src={nieve}
            alt="manos"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 5 }}
          />
        </div>
        <p>
          Con la promesa más sincera de elegirnos cada día
        </p>
        <p>
          Tenemos el agrado de invitarte a
        </p>
        <div className="nuestraBoda">

          <motion.p
            className="cursiveTextMea line-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 5, delay: 0.5 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Nuestra
          </motion.p>
          <motion.p
            className="cursiveTextMea line-end"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 5 }}
            viewport={{ once: true, amount: 0.7 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Boda
          </motion.p>
        </div>

        <div >
          <img src={anillospic} alt="manos" className="centralCircle"></img>
        </div>
      </div>

      <div className="section thirdSection normalText">
        <p className="subtitle cursiveTextMea">Ceremonia y Recepción</p>
        <div className="iconos">
          <img src={anillos} alt="anillos" ></img>
        </div>
        <div>
          <p>Sábado, 13 de septiembre</p>
          <p>4:00 PM</p>
          <p className="smallText">476 Devon St. Kearny, New Jersey</p>

        </div>

        <a
          href="https://www.google.com/maps/place/476+Devon+St,+Kearny,+NJ+07032"
          target="_blank"
          rel="noopener noreferrer"
          className="maps-button buttonweb"
        >
          Ver ubicación
        </a>
      </div>
      <div className="section fourthSection normalText">
        <p className="subtitle cursiveTextMea">Código de vestimenta</p>
        <p>ELEGANTE AL AIRE LIBRE</p>
        <p>Favor de reservar el color blanco, rojo y terracota.</p>
      </div>
      <div >
        <img src={manitos} alt="manos" className="normalPic"></img>
      </div>
      <div className="section fifthSection normalText">
        <p className="subtitle cursiveTextMea">Regalos</p>

        <p>¡Su presencia es el mejor regalo para nosotros!
          Si aún desean obsequiarnos un detalle para nuestra nueva etapa en matrimonio,
          el sobre será bienvenido ese día con mucho cariño.</p>
      </div>
      <div >
        <img src={foto8} alt="manos" className="normalPic"></img>
        <img src={foto9} alt="manos" className="normalPic"></img>
        <img src={foto10} alt="manos" className="normalPic"></img>
      </div>
      <div className="section sixthSection normalText">
        <p className="subtitle cursiveTextMea">Nos ayudas con la playlist? </p>
        <div className="iconos">
          <img src={bola} alt="bola"></img>
        </div>

        <a
          href="https://youtube.com/playlist?list=PLXnYM_Pauo2hUlqXqd1RhOePPsnJ0G0qQ&si=8GPKP_yf1HlmAp6r"
          target="_blank"
          rel="noopener noreferrer"
          className="maps-button buttonweb"
        >
          Agregar una canción
        </a>

      </div>
      <Carousel />
      <div className="section seventhSection normalText">
        <p className="subtitle">RSPV</p>
        <a
          href="https://www.google.com/maps/place/476+Devon+St,+Kearny,+NJ+07032"
          target="_blank"
          rel="noopener noreferrer"
          className="maps-button buttonweb"
        >
          Confirmar
        </a>
      </div>
      <div className="section eigthSection normalText">
        <p className="subtitle cursiveTextMea">Gracias por acompañarnos en este dia tan especial para nosotros.</p>

      </div>
      <p></p>
    </div >
  );
}

export default App;
