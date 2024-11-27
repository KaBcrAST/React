import React, { useState } from "react";
import axios from "axios";
import { generatePkceCodes } from "pkce-challenge";

const API_URL = "https://ap-dfe2cvfsdafwewaw.canadacentral-01.azurewebsites.net";
const CLIENT_ID = "<Votre_CLIENT_ID>";
const REDIRECT_URI = "<Votre_REDIRECT_URI>";
const TENANT_ID = "<Votre_TENANT_ID>";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const handleLogin = () => {
    // Générer PKCE
    const { code_challenge, code_verifier } = generatePkceCodes();

    // Enregistrer le code_verifier dans le localStorage
    localStorage.setItem("pkce_verifier", code_verifier);

    // Construire l'URL d'autorisation avec PKCE
    const authUrl = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize?` +
      `client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&response_mode=query&scope=openid profile email offline_access` +
      `&code_challenge=${code_challenge}&code_challenge_method=S256`;

    // Rediriger l'utilisateur vers Azure AD pour la connexion
    window.location.href = authUrl;
  };

  const handleCallback = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("code");

    if (code) {
      const code_verifier = localStorage.getItem("pkce_verifier");

      try {
        const response = await axios.get(
          `${API_URL}/auth/callback?code=${code}&code_verifier=${code_verifier}`
        );
        setIsAuthenticated(true);
        setUserToken(response.data.accessToken);
        alert("Connexion réussie !");
      } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        alert("Erreur lors de la connexion.");
      }
    }
  };

  React.useEffect(() => {
    handleCallback();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Application OAuth avec Azure AD</h1>
      {!isAuthenticated ? (
        <button onClick={handleLogin}>Se connecter avec Azure AD</button>
      ) : (
        <div>
          <h2>Vous êtes connecté !</h2>
          <p>Token : {userToken}</p>
        </div>
      )}
    </div>
  );
}

export default App;
