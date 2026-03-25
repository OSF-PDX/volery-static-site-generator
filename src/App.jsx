import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import voleryLogo from './assets/volery-logo-sketch.png'
import './App.css'



function App() {
  const [error, setError] = useState(null);

  // placeholder function
const uploadCSV = () => {
  setError("No upload function exists yet.");
}

  return (
    <body>
      <header>
        <a href="#main" class="skip">Skip to main content</a>
        <div>
          <img src={voleryLogo} className='logo'/>
        </div>
      </header>
      <main id="main">
        <h1>Volery</h1>
        <p>
          Conference name: <input />
        </p>
        <p>
          <button
            className="csv-upload"
            onClick={uploadCSV}
            aria-describedby='csv-error'
          >
            Upload CSV
          </button>
        </p>
        <p id="csv-error" aria-live="polite" style={{color: 'red'}}>
          {error && `Error: ${error}`}
        </p>
        <p>
          <button disabled="true">
            Download site
          </button>
        </p>
      </main>
    </body>
  )
}

export default App
