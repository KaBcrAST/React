import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./msalConfig";

export const msalInstance = new PublicClientApplication(msalConfig);

// Appelle `handleRedirectPromise` une fois pour éviter l'erreur
msalInstance.handleRedirectPromise().catch((error) => {
  console.error("Erreur d'initialisation MSAL:", error);
});
