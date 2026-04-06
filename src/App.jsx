import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "./assets/vite.svg";
// import heroImg from "./assets/hero.png";
import csv2json from "./services/csv-to-json";
import { CsvFile } from "./services/csv-to-json";
import voleryLogo from './assets/volery-logo-sketch.png'

import "./App.css";

function App() {  
  const [error, setError] = useState(null);  
  const [csvFile, setCsvFile] = useState(null);
  const [csvText, setCsvText] = useState("");

  const uploadCSV = () => {
    //setError("No upload function exists yet.");
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {        
        file.text().then(contents => {          
          setError(null);          
          const csvFileInstance = new CsvFile(file.name, contents);
          setCsvFile(csvFileInstance);
          setCsvText(contents);
          console.log(`CSV File ${file.name}:`, csvFileInstance);          
        }).catch(err => {
          console.error('Error reading file:', err);
          setError("Error reading file.");
        });        
      }
    };
    fileInput.click();
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
            <button disabled={true}>
              Download site
            </button>
          </p>
          <h2>{csvFile ? csvFile.fileName : null}</h2>
          <p>
            
            {csvFile && (
              <textarea rows="6" cols="40" value={csvFile.fileContents} readOnly />
              // <textarea rows="6" cols="40" value={csvText} onChange={(e) => {
              //   setCsvText(e.target.value); 
              //   if (csvFile) {
              //     const newCsvFileInstance = new CsvFile(csvFile.objectName, csvText);
              //     setCsvFile(newCsvFileInstance);
              //     console.log('Updated CSV File Instance:', newCsvFileInstance);
              //   }
              // }}/>
            )}            
          </p>
      </main>
    </>
  );
}

export default App;
