import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProtectedPage = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        // Remplace par le token que tu as obtenu via MSAL
        const token = localStorage.getItem('access_token');

        const response = await axios.get(
          'https://ap-dfe2cvfsdafwewaw.canadacentral-01.azurewebsites.net/api/protected',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setMessage(response.data.message);
      } catch (error) {
        console.error('Erreur lors de la récupération des données protégées :', error);
      }
    };

    fetchProtectedData();
  }, []);

  return (
    <div>
      <h1>Page protégée</h1>
      <p>{message || 'Chargement...'}</p>
    </div>
  );
};

export default ProtectedPage;
