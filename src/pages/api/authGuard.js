import React, { useEffect } from 'react';
import { useSession } from '../../sessionContext';
import { useNavigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const { session, logout } = useSession(); // Utilizzo della funzione useSession dal tuo file
  const navigate = useNavigate();

  useEffect(() => {
    // Controlla se la sessione è valida
    if (!session) {
      navigate('/login');
      window.location.reload();
    }
  }, [session, navigate]);

  // Se siamo qui, significa che la sessione è stata verificata e l'utente è autenticato
  // Pertanto, possiamo visualizzare i componenti figlio normalmente
  return <>{children}</>;
};

export default AuthGuard;