import React from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import UserProfile from "./UserProfile";

const App = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch((e) => {
      console.error(e);
    });
  };

  const handleLogout = () => {
    instance.logoutPopup().catch((e) => {
      console.error(e);
    });
  };

  return (
    <div>
      <h1>React MSAL Authentication</h1>
      {!isAuthenticated ? (
        <button onClick={handleLogin}>Sign In</button>
      ) : (
        <>
          <button onClick={handleLogout}>Sign Out</button>
          <UserProfile />
        </>
      )}
    </div>
  );
};

export default App;
