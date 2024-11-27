export const msalConfig = {
    auth: {
      clientId: process.env.REACT_APP_CLIENT_ID,
      authority: `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}`,
      redirectUri: process.env.REACT_APP_REDIRECT_URI,
    },
    cache: {
      cacheLocation: "sessionStorage", // Peut être "localStorage" si nécessaire
      storeAuthStateInCookie: false, // Pour les anciens navigateurs
    },
  };
  