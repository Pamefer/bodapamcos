import { useEffect, useRef, useState } from 'react';
import principalPic from './static/DSC_0817.jpg';
import lapromesa from './static/lapromesa.mp3';
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

        <div className="namesContainer">
          <p>PAME</p>
          <p>&</p>
          <p>COSME</p>
        </div>

        <div className="quoteContainer">
          <p className="quotePhrase">Lo que Dios ha unido</p>
          <p className="quotePhrase">que no lo separe el hombre</p>
          <p>- MATEO 19:6 -</p>
        </div>
      </div>
    </div>
  );
}

export default App;
