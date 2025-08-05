import React from 'react';
import ReactDom from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import './index.css'


const root = ReactDom.createRoot(document.getElementById('app'))

root.render(
  <React.StrictMode>
    <BrowserRouter basename="/infotecs_tz">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);