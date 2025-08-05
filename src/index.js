import React from 'react';
import ReactDom from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import './index.css'


const root = ReactDom.createRoot(document.getElementById('app'))
const basename = process.env.NODE_ENV === 'production' ? '/infotecs_tz' : '/';
root.render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);