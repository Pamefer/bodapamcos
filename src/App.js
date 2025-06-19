import principalPic from './static/DSC_0817.jpg';
import lapromesa from './static/lapromesa.mp3';
import './App.css';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
      <audio src={lapromesa} loop="" className="framer-audio" preload="metadata" autoPlay></audio>
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
