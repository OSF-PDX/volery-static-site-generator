import { useState } from 'react'
import voleryLogo from './assets/volery-logo-sketch.png'
import './App.css'

function App() {
  const [error, setError] = useState(null);

  const uploadCSV = () => {
    setError("No upload function exists yet.");
  }

  return (
    <>
      <header>
        <a href="#main" className="skip">Skip to main content</a>
        <div>
          <img src={voleryLogo} className='logo'/>
        </div>
      </header>
      <main id="main">
        <h1>Volery</h1>
        <form>
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
            <button disabled={true}>
              Download site
            </button>
          </p>
        </form>
      </main>
    </>
  )
}

export default App
