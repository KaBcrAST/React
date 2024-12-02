import React, { useState } from 'react';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from './authConfig';
import FeedApp from './Component/FeedApp';
import Login from './Component/Login';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userInfo, token) => {
    setIsAuthenticated(true);
    setUser(userInfo);
    localStorage.setItem('accessToken', token);  // Stocke le token pour l'utiliser dans les requêtes
  };

  return (
    <MsalProvider instance={msalInstance}>
      <div className="app">
        {isAuthenticated ? (
          <FeedApp user={user} />  // Si l'utilisateur est authentifié, afficher FeedApp
        ) : (
          <Login onLogin={handleLogin} />  // Sinon, afficher la page de login
        )}
      </div>
    </MsalProvider>
  );
};

export default App;
