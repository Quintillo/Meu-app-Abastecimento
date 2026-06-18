// Intercept and handle sandbox-related HMR WebSocket errors to prevent browser overlays
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const reasonVal = String(event.reason || '');
    const reasonMsg = event.reason && typeof event.reason === 'object' && 'message' in event.reason ? String(event.reason.message) : '';
    if (
      reasonVal.toLowerCase().includes('websocket') ||
      reasonMsg.toLowerCase().includes('websocket')
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  });

  window.addEventListener('error', (event) => {
    const errorMsg = String(event.message || '');
    if (errorMsg.toLowerCase().includes('websocket')) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

