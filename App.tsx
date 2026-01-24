import React from 'react';
import { AppProviders } from './contexts/AppProviders';
import { MainLayout } from './components/MainLayout';

function App() {
  return (
    <AppProviders>
      <MainLayout />
    </AppProviders>
  );
}

export default App;
