export const msalConfig = {
    auth: {
      clientId: "b4a2a829-d4ce-49b9-9341-22995e0476ba", // Remplacez par l'ID client de votre application
      authority: "https://login.microsoftonline.com/3b644da5-0210-4e60-b8dc-0beec1614542/", // Remplacez par votre ID de locataire
      redirectUri: "https://gentle-wave-023be5a03.5.azurestaticapps.net/auth/callback", // URL de redirection configurée dans Azure AD
    },
    cache: {
      cacheLocation: "localStorage", // Peut être "sessionStorage"
      storeAuthStateInCookie: false, // utile pour les anciens navigateurs
    },
  };
  
  export const loginRequest = {
    scopes: ["User.Read"], // Permissions demandées (ex: accès aux données de profil utilisateur)
  };
  