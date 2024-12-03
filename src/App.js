import React, { useState, useEffect } from 'react';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from './authConfig';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Ajoutez Routes ici
import FeedApp from './Component/FeedApp';
import Login from './Component/Login';
import ProfilePage from './Component/ProfilePage'; // Importez ton composant UserProfile
import './App.css';
import UserProfile from './UserProfile';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Fonction pour récupérer le token dans le localStorage
  const getToken = () => {
    return localStorage.getItem('accessToken');  // Récupérer le token OAuth stocké
  };

  // Fonction pour vérifier l'authentification à chaque chargement
  const checkAuthentication = () => {
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);  // Si un token est trouvé, utilisateur authentifié
    } else {
      setIsAuthenticated(false); // Si pas de token, utilisateur non authentifié
    }
  };

  // Effect pour vérifier si l'utilisateur est déjà authentifié au démarrage de l'application
  useEffect(() => {
    checkAuthentication();
  }, []);  // L'effet ne se déclenche qu'une seule fois au démarrage

  const handleLogin = (userInfo, token) => {
    setIsAuthenticated(true);
    setUser(userInfo);
    localStorage.setItem('accessToken', token);  // Stocke le token pour une utilisation future
  };

  return (
    <MsalProvider instance={msalInstance}>
      <Router>
        <div className="app">
          {isAuthenticated ? (
            <Routes>
              <Route path="/" element={<FeedApp user={user} />} />  {/* Route pour la page Feed */}
              <Route path="/profile/:userId" element={<UserProfile/>} />
              </Routes>
          ) : (
            <Login onLogin={handleLogin} />  // Si pas authentifié, afficher la page de login
          )}
        </div>
      </Router>
    </MsalProvider>
  );
};

export default App;
