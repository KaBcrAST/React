import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { msalInstance, loginRequest } from './authConfig';

const UserProfile = () => {
  const { userId } = useParams(); // Récupère l'userId depuis l'URL
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPrivate, setIsPrivate] = useState(false); // État pour savoir si le profil est privé
  const [isOwnProfile, setIsOwnProfile] = useState(false); // Vérifie si c'est le profil de l'utilisateur connecté

  // Récupère un token d'accès
  const getAccessToken = async () => {
    try {
      const account = msalInstance.getActiveAccount();
      if (!account) {
        throw new Error('No active account set. Please log in first.');
      }
      const response = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: account,
      });
      return response.accessToken;
    } catch (error) {
      console.error('Erreur lors de la récupération du token:', error);
      return null;
    }
  };
  const togglePrivacy = async () => {
    const token = await getAccessToken();
    if (token) {
      try {
        const response = await fetch(`http://localhost:5000/profiles/privacy/${userId}`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isPrivate: !isPrivate }), // Inverse l'état actuel
        });
  
        if (response.ok) {
          const data = await response.json();
          setIsPrivate(data.isPrivate); // Met à jour l'état local
        } else {
          console.error('Erreur lors de la mise à jour de la confidentialité:', response.status);
        }
      } catch (error) {
        console.error('Erreur lors de la requête de mise à jour:', error);
      }
    }
  };
  

  // Vérifie si le profil est privé
  const checkProfilePrivacy = async () => {
    const token = await getAccessToken();
    if (token) {
      try {
        const response = await fetch(`http://localhost:5000/profiles/${userId}/privacy`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setIsPrivate(data.isPrivate); // Met à jour l'état de confidentialité
        } else {
          console.error('Erreur lors de la vérification de la confidentialité:', response.status);
        }
      } catch (error) {
        console.error('Erreur lors de la requête de confidentialité:', error);
      }
    }
  };

  // Récupère les données utilisateur
  const fetchUserProfile = async () => {
    setLoading(true);
    setError(null);
    const token = await getAccessToken();
    if (token) {
      try {
        const response = await fetch(`http://localhost:5000/profiles/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setProfile(data);

          // Vérifie si c'est le profil de l'utilisateur connecté
          const activeAccount = msalInstance.getActiveAccount();
          if (activeAccount && activeAccount.localAccountId === userId) {
            setIsOwnProfile(true);
            setIsPrivate(data.isPrivate || false); // Initialiser l'état privé
          }
        } else {
          setError('Erreur lors de la récupération du profil utilisateur.');
          console.error('Erreur HTTP:', response.status);
        }
      } catch (error) {
        setError('Erreur lors de la requête.');
        console.error('Erreur lors de la requête:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setError('Impossible de récupérer le token.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile(); // Charge le profil au montage du composant
    checkProfilePrivacy(); // Vérifie si le profil est privé
  }, [userId]);

  return (
    <div className="user-profile-container">
      {loading ? (
        <p>Chargement des informations utilisateur...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        profile && (
          <div>
            <h1>Nom : {profile.givenName || 'Non disponible'}</h1>
            <h2>Prénom : {profile.surname || 'Non disponible'}</h2>
            <p>ID : {profile.id}</p>
            <p>Email : {profile.userPrincipalName || 'Non disponible'}</p>
            <p>Statut : {isPrivate ? 'Privé' : 'Public'}</p>

            {/* Bouton pour basculer entre privé/public */}
            {isOwnProfile && (
              <button onClick={togglePrivacy}>
                {isPrivate ? 'Rendre Public' : 'Rendre Privé'}
              </button>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default UserProfile;
