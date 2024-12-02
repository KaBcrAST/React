import { PublicClientApplication } from '@azure/msal-browser';

export const msalConfig = {
  auth: {
    clientId: 'b4a2a829-d4ce-49b9-9341-22995e0476ba', // Remplacez par votre client ID Azure AD
    authority: 'https://login.microsoftonline.com/3b644da5-0210-4e60-b8dc-0beec1614542/', // ID de locataire
    redirectUri: 'http://localhost:3000/auth/callback', // URL de redirection
  },
  cache: {
    cacheLocation: 'localStorage', // Utilisation de localStorage pour stocker l'état d'authentification
    storeAuthStateInCookie: false, // Pour la compatibilité avec les anciens navigateurs
  },
};

export const loginRequest = {
  scopes: ['User.Read'], // Permissions nécessaires (ex. : accès aux données de profil utilisateur)
};

export const msalInstance = new PublicClientApplication(msalConfig);
