import React, { useEffect, useState } from 'react';
import { msalInstance } from '../authConfig';  // Assurez-vous que msalInstance est correctement configuré

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Effectuer une récupération du token et de l'ID utilisateur avec MSAL
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await msalInstance.acquireTokenSilent({
          scopes: ['User.Read'],
        });

        const userId = response.account.idTokenClaims.oid; // ID utilisateur récupéré via MSAL
        setUserId(userId);  // Sauvegarde de l'ID de l'utilisateur
        console.log('User ID:', userId);

        fetchUserProfile(userId);  // Récupération du profil avec l'ID
      } catch (error) {
        console.log('Error acquiring token:', error);
        setLoading(false);  // Fin du chargement même en cas d'erreur
      }
    };

    fetchUserId();
  }, []);

  // Fonction pour récupérer le profil de l'utilisateur avec son ID
  const fetchUserProfile = async (userId) => {
    if (!userId) return;

    try {
      console.log(`Fetching profile data for user ID: ${userId}`);

      const token = await msalInstance.acquireTokenSilent({
        scopes: ['User.Read'],
      });

      const response = await fetch(`http://localhost:5000/profiles/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token.accessToken}`,
        },
      });

      console.log('Response Status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('User profile data:', data);
        setUserProfile(data);
      } else {
        console.error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error fetching user profile', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userProfile) {
    return <p>No profile data available.</p>;
  }

  return (
    <div>
      <h1>Profile of {userProfile.name}</h1>
      <p>Email: {userProfile.mail}</p>
      {/* Afficher d'autres informations pertinentes ici */}
    </div>
  );
};

export default ProfilePage;
