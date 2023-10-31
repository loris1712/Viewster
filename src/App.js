import AppRouter from './AppRouter';
import React from 'react';
import './App.css';
import { SessionProvider } from './sessionContext';

function App() {
  return (
    <div className='app-container'>
      <SessionProvider>
        <AppRouter />
      </SessionProvider>
      
    </div>
  );
}

export default App;
