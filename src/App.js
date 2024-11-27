import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { msalInstance, loginRequest } from './authConfig';
import LoginPage from './LoginPage';
import Callback from './Callback';
import ProtectedPage from './ProtectedPage'; // Assurez-vous que ce fichier existe

const App = () => {
  // Fonction de login
  const login = async () => {
    try {
      await msalInstance.loginPopup(loginRequest);
      console.log('Connexion réussie');
    } catch (error) {
      console.error('Erreur de connexion :', error);
    }
  };

  useEffect(() => {
    const checkAccount = async () => {
      const currentAccount = msalInstance.getAllAccounts()[0];
      if (currentAccount) {
        console.log('Utilisateur connecté :', currentAccount);
      }
    };

    checkAccount();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage login={login} />} />
        <Route path="/auth/callback" element={<Callback />} />
        <Route path="/protected" element={<ProtectedPage />} />
      </Routes>
    </Router>
  );
};

export default App;
