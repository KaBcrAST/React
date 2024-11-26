import React from 'react';
import { useAuth } from './AuthProvider';

const LoginPage = () => {
  const { login } = useAuth();

  const handleLogin = async () => {
    await login();  // Appel de la fonction login de MSAL
  };

  return (
    <div>
      <h1>Se connecter à l'application</h1>
      <button onClick={handleLogin}>Se connecter avec Azure AD</button>
    </div>
  );
};

export default LoginPage;
