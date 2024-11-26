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
      .then((data) => {
        console.log("Utilisateur connecté:", data); // Affiche l'objet utilisateur dans la console
        setUser(data);  // Met à jour l'état utilisateur
        window.location.href = "/home"; // Vous pouvez rediriger l'utilisateur vers la page "Home" ici
      })
      .catch(() => setUser(null));
  }, []);

  // Fonction pour rediriger vers la page de connexion Azure
  const handleLogin = () => {
    window.location.href = "https://ap-dfe2cvfsdafwewaw.canadacentral-01.azurewebsites.net/auth/openid";
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Bienvenue, {user.displayName}</h1>
          <p>Email: {user.emails?.[0]}</p>
          {/* Vous pouvez afficher d'autres informations utilisateur ici */}
        </div>
      ) : (
        <button onClick={handleLogin}>Se connecter avec Azure AD</button>
      )}
    </div>
  );
};

export default App;
