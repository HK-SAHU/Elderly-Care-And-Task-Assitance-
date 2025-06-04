// Add this import at the top of your file
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
