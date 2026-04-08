import { useState } from "react";
import voleryLogo from './assets/volery-logo-sketch.png';
import { DownloadButton } from "./services/zip-download";
import {saveZip} from "./services/zip-download";
import { buildSiteZip } from "./services/generate-site";

import "./App.css";

function App() {
  const [error, setError] = useState(null);

  const generateWebsite = async () => {
    const zip = await buildSiteZip();
    saveZip(zip);
  }

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
            <DownloadButton/>
          </p>
          <p>
            <button onClick={generateWebsite}>GENERATE WEBSITE</button>
          </p>
      </main>
    </>
  );
}

export default App;
