import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// import GenerateStaticSiteButton from './template_test.jsx'
import RenderedTemplate from './proof_of_function.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <h1>template test</h1>
    <RenderedTemplate />
  </StrictMode>,
)
