import React, { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const handleLogin = () => {
    // Envoie une requête POST pour démarrer le processus d'authentification
    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        // Redirige vers l'URL de connexion Azure AD
        window.location.href = data.authUrl;
      })
      .catch(error => {
        console.error('Erreur de connexion:', error);
      });
  };

  const handleCallback = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');

    if (code) {
      try {
        // Envoie le code reçu pour obtenir un access_token
        const response = await fetch(`/api/auth/callback?code=${code}`);
        const data = await response.json();
        
        if (data.accessToken) {
          setIsAuthenticated(true);
          setUserToken(data.accessToken);
          alert('Connexion réussie !');
        }
      } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        alert('Erreur lors de la connexion.');
      }
    }
  };

  React.useEffect(() => {
    handleCallback();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
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
