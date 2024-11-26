import React, { createContext, useContext, useState, useEffect } from 'react';
import { msalInstance, loginRequest } from './authConfig';  // Importez votre instance MSAL

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Fonction d'initialisation de MSAL
  const initializeMSAL = async () => {
    try {
      await msalInstance.initialize();  // Initialiser MSAL
      setIsInitialized(true);
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de MSAL :', error);
    }
  };

  useEffect(() => {
    initializeMSAL();  // Init au montage du composant
  }, []);

  const login = async () => {
    if (!isInitialized) {
      console.error('MSAL n\'est pas encore initialisé');
      return;
    }

    try {
      const response = await msalInstance.loginPopup(loginRequest);
      setAccount(response.account);
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
    }
  };

  return (
    <AuthContext.Provider value={{ login, account }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
