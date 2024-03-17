import React, { createContext, useContext, useState } from 'react';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(() => {
    // Recupera la sessione dal localStorage se presente
    const savedSession = localStorage.getItem('session');
    return savedSession ? JSON.parse(savedSession) : null;
  });

  const login = (email) => {
    // Logica per impostare la sessione utente
    setSession({ email });
    // Salva la sessione nel localStorage
    localStorage.setItem('session', JSON.stringify({ email }));
    localStorage.setItem('chatData', JSON.stringify([]));
  };

  const logout = () => {
    // Logica per terminare la sessione utente
    setSession(null);
    // Rimuovi la sessione dal localStorage
    localStorage.removeItem('session');
  };

  return (
    <SessionContext.Provider value={{ session, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession deve essere utilizzato all\'interno di SessionProvider');
  }
  return context;
};
