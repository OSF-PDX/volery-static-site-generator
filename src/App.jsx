import { useState } from "react";
import csv2json from "./services/csv-to-json";
import voleryLogo from './assets/volery-logo-sketch.png';
import { DownloadButton } from "./services/zip-download";
import { RenderedTemplate } from "./services/templating";

const csvData = `name,age,city
Alice,30,New York
Bob,25,Los Angeles
Charlie,35,Chicago`;

const jsonData = csv2json("persons.csv", csvData);
console.log(jsonData);
console.log(JSON.stringify(jsonData));

import "./App.css";

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
            <RenderedTemplate />
          </p>
      </main>
    </>
  );
}

export default App;
