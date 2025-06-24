import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import Carousel from './Carousel';

import lapromesa from './static/lapromesa.mp3';

import anillos from './static/anillos.png';
import bola from './static/bola.png';

import principalPic from './static/portada_optimized.webp';
import nieve from './static/nieve2.jpg';
import anillospic from './static/DSC_0892.jpg';
import manitos from './static/manitos_3.jpg';
import foto8 from './static/DSC_0884.jpg';
import foto9 from './static/DSC_0868.jpg';
import foto10 from './static/DSC_0824.jpg';
import gradas from './static/edited.jpg';
import sobre from './static/sobre_optimized.webp';

import './App.css';

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
  const [isFirstTime, setIsFirstTime] = useState(true);

  const text = "¡Nos casamos!";
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1, y: 0,
      transition: {
        duration: 0.8, // duración individual de cada letra
        ease: "easeOut",
      },
    },
  };

  const containerpc = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
      },
    },
  };

  const itempc = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.8,
        ease: "easeOut",
      },
    },
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


    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (audioRef.current) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      } else {
        if (audioRef.current) {
          audioRef.current
            .play()
            .then(() => {
              setIsPlaying(true); // ✅ Actualiza ícono si se pudo reproducir
            })
            .catch(() => {
              setIsPlaying(false); // ✅ Si falla, se asegura que muestre "Play"
              console.log("Requiere interacción del usuario para reanudar el audio.");
            });
        }
      }
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.addEventListener('visibilitychange', handleVisibilityChange);

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
      {isFirstTime ?
        <div onClick={() => { setIsFirstTime(false) }}
        >
          <img src={sobre} alt="pameycos" className="background-image-sobre" />
        </div>
        :
        <div>
          <header className="App-header"></header>

          <audio ref={audioRef} loop preload="metadata">
            <source src={lapromesa} />
          </audio>

          <div className="firstSection">
            <img src={principalPic} alt="pameycos" className="background-image" />

            <div className="audio-controls">
              {isPlaying ? <Pause onPlayerClick={handlePause} /> : <Play onPlayerClick={handlePlay} />}
            </div>

            <motion.div
              className="namesContainer"
              variants={containerpc}
              initial="hidden"
              animate="visible"
            >
              <motion.p className="pame" variants={itempc}>Pame</motion.p>
              <motion.p className="cosme" variants={itempc}>& Cosme</motion.p>
            </motion.div>

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
            <p>Lo que empezó como una amistad creció con el tiempo... se volvió complicidad, amor, y ahora, un para siempre.</p>
            <div >
              <motion.img
                src={nieve}
                alt="Foto especial"
                className="centralSquare"

                initial={{
                  clipPath: 'inset(0 50% 0 50%)',
                  opacity: 0,
                }}
                whileInView={{
                  clipPath: 'inset(0 0% 0 0%)',
                  opacity: 1,
                }}
                transition={{
                  duration: 2.5,
                  ease: [0.42, 0, 0.58, 1],
                }}
                viewport={{ once: true }}

              // initial={{ opacity: 0, x: -100 }}
              // whileInView={{ opacity: 1, x: 0 }}
              // transition={{ duration: 1.8, ease: 'easeOut' }}
              // viewport={{ once: true, amount: 0.4 }}
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

          <motion.div
            className="section thirdSection normalText"
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.7 }}
            whileInView={{ opacity: 1, y: 0 }}>
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
          </motion.div>
          <div className="section fourthSection normalText">
            <p className="subtitle cursiveTextMea">Código de vestimenta</p>
            <p>ELEGANTE AL AIRE LIBRE</p>
            <p>Favor de reservar el color blanco, rojo y terracota.</p>
          </div>
          <div >
            <img src={gradas} alt="manos" className="normalPic"></img>
          </div>
          <motion.div
            className="section fifthSection normalText"
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.4 }}>
            <p className="subtitle cursiveTextMea">Regalos</p>

            <p>¡Su presencia es el mejor regalo para nosotros!
              Si aún desean obsequiarnos un detalle para nuestra nueva etapa en matrimonio,
              el sobre será bienvenido ese día con mucho cariño.</p>
          </motion.div>
          <div >
            <img src={foto8} alt="manos" className="normalPic"></img>
            <img src={foto10} alt="manos" className="normalPic"></img>
            <img src={foto9} alt="manos" className="normalPic"></img>

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
              className="maps-button buttonweb bola"
            >
              Agregar una canción
            </a>

          </div>
          <Carousel />
          <div className="section seventhSection normalText">
            <p className="subtitle">¿Nos acompañas?</p>
            <p>Por favor, confirma tu asistencia enviándonos un mensajito </p>
            <a
              href="https://form.typeform.com/to/rOMHtih8https://form.typeform.com/to/rOMHtih8"
              // href="https://wa.me/19735835202?text=Hola,%20quiero%20confirmar%20mi%20asistencia%20a%20su%20boda%20el%2013%20de%20septiembre%20🥰"
              target="_blank"
              rel="noopener noreferrer"
              className="maps-button buttonweb bola"
            >
              Confirmar
            </a>
          </div>
          <motion.div
            className="section eigthSection normalText"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <p className="subtitle cursiveTextMea">Gracias por acompañarnos en este día tan especial para nosotros.</p>

          </motion.div>
          <img src={manitos} alt="manos" className="normalPic"></img>
        </div>
      }

    </div >
  );
}

export default App;
