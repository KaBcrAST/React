import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://ap-dfe2cvfsdafwewaw.canadacentral-01.azurewebsites.net';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  const handleLogin = () => {
    window.location.href = `${API_URL}/auth/login`;
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/success`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(`Bienvenue ! Votre token : ${response.data.token}`);
    } catch (err) {
      console.error(err);
      alert('Impossible de récupérer les détails utilisateur.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Application OAuth avec Azure AD</h1>
      {!isAuthenticated ? (
        <button onClick={handleLogin}>Se connecter avec Azure AD</button>
      ) : (
        <>
          <button onClick={fetchUserDetails}>Voir mes informations</button>
        </>
      )}
    </div>
  );
}

export default App;
