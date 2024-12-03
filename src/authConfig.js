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

// Fonction pour récupérer ou créer un profil utilisateur
export const fetchOrCreateUserProfile = async () => {
  try {
    // Acquérir un token d'accès silencieusement
    const response = await msalInstance.acquireTokenSilent({
      scopes: ['User.Read'],
    });

    // Récupérer l'ID de l'utilisateur (graphUserId)
    const userId = response.account.idTokenClaims.oid;  // L'ID unique de l'utilisateur dans Azure AD
    console.log('User ID:', userId);

    // Appeler ton API backend pour vérifier ou créer le profil utilisateur
    const apiResponse = await fetch(`http://localhost:5000/profiles/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${response.accessToken}`,
      },
    });

    const data = await apiResponse.json();
    console.log('User profile:', data);

    // Tu peux stocker les données du profil dans l'état de ton application si nécessaire
    return data;  // Retourner les données du profil utilisateur

  } catch (error) {
    console.error('Error during token acquisition or API call:', error);
  }
};
