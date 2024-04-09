import React, { useEffect } from 'react';
import { useSession } from '../../sessionContext';
import { useNavigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const { session, logout } = useSession();
  const navigate = useNavigate();

  useEffect(() => {

    if (!session) {
      navigate('/login');
      window.location.reload();
    }
  }, [session, navigate]);

  return <>{children}</>;
};

export default AuthGuard;