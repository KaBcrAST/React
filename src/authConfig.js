// src/authConfig.js

import { PublicClientApplication } from '@azure/msal-browser';

export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID, // Utilise la variable d'environnement pour le Client ID
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}`, // Utilise la variable d'environnement pour le Tenant ID
    redirectUri: process.env.REACT_APP_REDIRECT_URI, // URL de redirection après l'authentification
  },
  cache: {
    cacheLocation: "sessionStorage", // "localStorage" ou "sessionStorage"
    storeAuthStateInCookie: false,
  }
};

export const msalInstance = new PublicClientApplication(msalConfig);

export const loginRequest = {
  scopes: [
    "openid", 
    "profile", 
    "offline_access", 
    "api://TON_CLIENT_ID/Storage.ReadWrite"  // Remplace par ton propre scope API
  ]
};
