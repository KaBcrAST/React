import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider';

const ProfilePage = () => {
  const { account } = useAuth();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (account) {
      // En fonction de ce que tu veux afficher, tu pourrais faire une requête API ici
      setProfileData(account);
    }
  }, [account]);

  if (!profileData) {
    return <div>Chargement du profil...</div>;
  }

  return (
    <div>
      <h1>Bienvenue, {profileData.username}</h1>
      <pre>{JSON.stringify(profileData, null, 2)}</pre>
    </div>
  );
};

export default ProfilePage;
