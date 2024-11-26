import { PublicClientApplication } from '@azure/msal-browser';

export const msalConfig = {
  auth: {
    clientId: "b4a2a829-d4ce-49b9-9341-22995e0476ba", // Remplacez par votre Client ID Azure AD
    authority: "https://login.microsoftonline.com/3b644da5-0210-4e60-b8dc-0beec1614542", // Remplacez par votre Tenant ID
    redirectUri: "http://ap-dfe2cvfsdafwewaw.canadacentral-01.azurewebsites.net/auth/callback",  // URL de redirection après l'authentification
  },
  cache: {
    cacheLocation: "sessionStorage", // Utilisez sessionStorage pour stocker l'état
    storeAuthStateInCookie: false, 
  }
};

export const msalInstance = new PublicClientApplication(msalConfig);

export const loginRequest = {
  scopes: ["openid", "profile", "offline_access", "api://b4a2a829-d4ce-49b9-9341-22995e0476ba/Storage.ReadWrite"],
};
