import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://ap-dfe2cvfsdafwewaw.canadacentral-01.azurewebsites.net";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState(null);

  // Redirection pour la connexion
  const handleLogin = () => {
    window.location.href = `${API_URL}/auth/login`;
  };

  // Récupération des tokens après le callback
  const handleCallback = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("code");

    if (code) {
      try {
        const response = await axios.get(`${API_URL}/auth/callback?code=${code}`);
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
