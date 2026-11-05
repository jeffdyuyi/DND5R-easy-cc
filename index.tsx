import { registerPwa } from './src/pwa/client';
import { AppErrorBoundary } from './components/AppErrorBoundary';
import { ExternalResourceProvider } from './contexts/ExternalResourceContext';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/utilities.css';
import './index.css';
import './resource-cards.css';
import './styles/character.css';
import './styles/handbook-theme.css';
import './styles/app-shell.css';
import './styles/dice-studio.css';
import './styles/library-workspace.css';
import './styles/compact-cards.css';
import './styles/character-folio.css';
import './styles/dialog-controls.css';
import './styles/fantasy-ui.css';
import './styles/adventure-theme.css';
import './styles/card-covers.css';
import './styles/character-inventory.css';
import './styles/character-quick-view.css';
import './styles/resource-management.css';
const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error("Could not find root element to mount to");
}
const root = ReactDOM.createRoot(rootElement);
root.render(<React.StrictMode>
    <AppErrorBoundary><ExternalResourceProvider><App /></ExternalResourceProvider></AppErrorBoundary>
  </React.StrictMode>);



registerPwa();
