// src/main.tsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './app/pages/home';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
)