import React, { useEffect, useState } from "react";
import { msalInstance } from "./msalInstance";

const App = () => {
  const [msalInitialized, setMsalInitialized] = useState(false);

  useEffect(() => {
    const initializeMsal = async () => {
      try {
        await msalInstance.handleRedirectPromise(); // Initialise MSAL
        console.log("MSAL initialized");
        setMsalInitialized(true); // MSAL prêt à être utilisé
      } catch (error) {
        console.error("Erreur lors de l'initialisation de MSAL:", error);
      }
    };
    initializeMsal();
  }, []);

  const login = async () => {
    if (!msalInitialized) {
      console.error("MSAL n'est pas encore initialisé !");
      return;
    }

    try {
      const loginResponse = await msalInstance.loginPopup({
        scopes: ["User.Read"], // Assurez-vous que ce scope est configuré dans Azure AD
      });
      console.log("Login Successful: ", loginResponse);
    } catch (error) {
      console.error("Login Error: ", error);
    }
  };

  return (
    <div>
      <h1>Application React avec MSAL</h1>
      {msalInitialized ? (
        <button onClick={login}>Se connecter</button>
      ) : (
        <p>Initialisation en cours...</p>
      )}
    </div>
  );
};

export default App;
