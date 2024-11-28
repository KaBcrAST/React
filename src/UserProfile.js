import React, { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";

const UserProfile = () => {
  const { instance, accounts } = useMsal();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Récupérer un jeton d'accès silencieusement
        const response = await instance.acquireTokenSilent({
          ...loginRequest,
          account: accounts[0], // Utiliser le premier compte connecté
        });

        // Appeler l'API Graph pour récupérer les infos utilisateur
        const userResponse = await fetch("https://graph.microsoft.com/v1.0/me", {
          headers: {
            Authorization: `Bearer ${response.accessToken}`,
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUserInfo(userData); // Stocker les infos utilisateur
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des infos utilisateur", error);
      }
    };

    if (accounts.length > 0) {
      fetchUserInfo();
    }
  }, [instance, accounts]);

  if (!userInfo) {
    return <p>Loading user information...</p>;
  }

  return (
    <div>
      <h3>User Profile</h3>
      <p><strong>Name:</strong> {userInfo.displayName}</p>
      <p><strong>Email:</strong> {userInfo.mail || userInfo.userPrincipalName}</p>
      <p><strong>Job Title:</strong> {userInfo.jobTitle || "Not specified"}</p>
    </div>
  );
};

export default UserProfile;
