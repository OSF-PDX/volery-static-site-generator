import { useState, useRef } from "react";
import voleryLogo from './assets/volery-logo-sketch.png';
import {saveZip} from "./services/zip-download";
import { buildSiteZipFromCSV } from "./services/generate-site";

import "./App.css";

function App() {
  const [error, setError] = useState(null);
  const [csvText, setCSVText ] = useState(null);
  const fileInputRef = useRef(null);

  const uploadCSV = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.name.endsWith(".csv")) {
      setError("Please upload a CSV file.");
      setCSVText(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = (evt) => {
      setCSVText(evt.target.result);
      setError(null);
    };
    reader.readAsText(file);
  };

  const generateWebsite = async () => {
    const zip = await buildSiteZipFromCSV(csvText);
    saveZip(zip);
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
            {/* Hidden file input, triggered by the button below */}
            <input 
              ref={fileInputRef}
              type="file"
              accept=".csv"
              style={{display: "none"}}
              onChange={handleFileChange}
            />
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
            <button
              onClick={generateWebsite}
              disabled={!csvText}
            >
              GENERATE WEBSITE
            </button>
          </p>
      </main>
    </>
  );
}

export default App;
