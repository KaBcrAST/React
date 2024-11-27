import React, { createContext, useContext, useState, useEffect } from 'react';
import { msalInstance, loginRequest } from './authConfig';  // Importation de msalInstance

const AuthContext = createContext();  // Création du contexte d'authentification

export const AuthProvider = ({ children }) => {
  const [account, setAccount] = useState(null);  // État pour stocker les informations de l'utilisateur connecté
  const [isInitialized, setIsInitialized] = useState(false);  // État pour vérifier si MSAL est initialisé

  // Initialisation de MSAL
  const initializeMSAL = async () => {
    try {
      console.log('Initialisation de MSAL...');
      await msalInstance.initialize();  // Initialisation de MSAL
      setIsInitialized(true);
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de MSAL :', error);
    }
  };

  useEffect(() => {
    initializeMSAL();
  }, []);  // Le tableau vide [] signifie que l'initialisation se fait au premier rendu

  // Fonction de connexion
  const login = async () => {
    if (!isInitialized) {
      console.error('MSAL n\'est pas encore initialisé');
      return;
    }

    try {
      console.log('Tentative de connexion via popup...');
      const response = await msalInstance.loginPopup(loginRequest);  // Connexion via popup
      console.log('Réponse de la connexion : ', response);
      setAccount(response.account);  // Sauvegarde les informations de l'utilisateur
    } catch (error) {
      console.error('Erreur lors de la connexion : ', error);
    }
  };

  return (
    <AuthContext.Provider value={{ login, account }}>
      {children}  // Fournit le contexte aux composants enfants
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);  // Hook pour accéder au contexte d'authentification
