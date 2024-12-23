import React, { useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const { instance } = useMsal();

  const login = async () => {
    setLoading(true);
    try {
      const loginResponse = await instance.loginPopup(loginRequest);
      const user = loginResponse.account;  // Informations sur l'utilisateur connecté
      const token = loginResponse.accessToken;  // Token d'accès

      // Appel de la fonction `onLogin` pour transmettre les informations à App.js
      onLogin(user, token);
    } catch (error) {
      console.error('Login failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Your Account</h2>
      <button onClick={login} disabled={loading}>
        {loading ? 'Loading...' : 'Login with Microsoft'}
      </button>
    </div>
  );
};

export default Login;
