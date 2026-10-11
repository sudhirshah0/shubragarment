/* ═══════════════════════════════════════════════════════════════════
   main.jsx — Entry point
   Renders the App component into the DOM root.
   ═══════════════════════════════════════════════════════════════════ */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

/* Lock scroll immediately so loader is visible before React hydrates */
document.body.classList.add('scroll-locked');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
