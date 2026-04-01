import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "./assets/vite.svg";
// import heroImg from "./assets/hero.png";
import csv2json from "./services/csv-to-json";
import voleryLogo from './assets/volery-logo-sketch.png'

// const csvData = `name,age,city
// Alice,30,New York
// Bob,25,Los Angeles
// Charlie,35,Chicago`;



//const jsonData = csv2json("persons.csv", csvData);
// Simple test of the csv2json function.
//console.log(jsonData);
//console.log(JSON.stringify(jsonData));

import "./App.css";

function App() {
  //const [count, setCount] = useState(0);
//import { useState } from 'react'



//function App() {
  
  const [error, setError] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [csvObject, setCsvObject] = useState(null);
  const [csvFilename, setCsvFilename] = useState(null);

  const csvFileChanged = (contents) => {
    setFileData(contents);   
    setCsvObject(csv2json(csvFilename, contents));
  }


  const uploadCSV = () => {
    //setError("No upload function exists yet.");
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // Store the file in state or process it
        setCsvFilename(file.name);        
        console.log('File selected:', csvFilename);
        console.log('File object:', file);
        file.text().then(contents => {
          console.log('File contents:', contents);
          setError(null);
          //const jsonData = csv2json(file.name, contents);
            
          //setFileData(contents);   
          setCsvFilename(file.name);
          setCsvObject(csv2json(file.name, contents));
          //csvFileChanged(contents);
          console.log('CSV Data:', csvObject);  
        }).catch(err => {
          console.error('Error reading file:', err);
          setError("Error reading file.");
        });
        // const jsonData = csv2json(file.name, file);
        // console.log('JSON Data:', jsonData);
        // setError("File uploaded successfully.");
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
          <h2>CSV File Contents:</h2>
          <p>
            
            {fileData && (
              //<textarea rows="6" cols="40" value={fileData} onChange={(e) => csvFileChanged(e.target.value)} />
              <textarea rows="6" cols="40" value={fileData} readOnly/>
            )}
            
          </p>

      </main>
    </>
  );
}

export default App;
