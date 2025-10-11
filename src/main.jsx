import { StrictMode } from 'react'
import './index.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import React from 'react'
import { BrowserRouter } from 'react-router-dom';

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  )