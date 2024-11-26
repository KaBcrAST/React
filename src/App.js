import React, { useEffect, useState } from "react";

const App = () => {
  const [user, setUser] = useState(null);

  // Vérifie si l'utilisateur est connecté
  useEffect(() => {
    fetch("https://ap-dfe2cvfsdafwewaw.canadacentral-01.azurewebsites.net/profile", {
      method: "GET",
      credentials: "include", // Important pour inclure les cookies de session
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Non connecté");
        }
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  // Fonction pour rediriger l'utilisateur vers Azure AD pour se connecter
  const handleLogin = () => {
    window.location.href = "https://ap-dfe2cvfsdafwewaw.canadacentral-01.azurewebsites.net/auth/openid";
  };

  // Afficher le profil utilisateur ou une option de connexion
  return (
    <div>
      {user ? (
        <div>
          <h1>Bienvenue, {user.displayName}</h1>
          <p>Email: {user.emails?.[0]}</p>
        </div>
      ) : (
        <button onClick={handleLogin}>Se connecter avec Azure AD</button>
      )}
    </div>
  );
};

export default App;
