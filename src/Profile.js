import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';

const Profile = () => {
  const { account } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (account) {
      // Envoyer le token au backend pour récupérer les données utilisateur
      fetch('http://localhost:3001/auth/openid/return', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${account.idToken}`,
        },
      })
        .then(res => res.json())
        .then(data => setProfile(data));
    }
  }, [account]);

  return (
    <div>
      {profile ? (
        <div>
          <h1>Bienvenue, {profile.displayName}</h1>
          <p>Email: {profile.emails ? profile.emails[0] : 'Non disponible'}</p>
        </div>
      ) : (
        <p>Chargement du profil...</p>
      )}
    </div>
  );
};

export default Profile;
