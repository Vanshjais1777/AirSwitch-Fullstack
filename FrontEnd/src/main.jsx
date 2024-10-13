import React from 'react';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { createRoot } from 'react-dom/client'
import './index.css'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
);