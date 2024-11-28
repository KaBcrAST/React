import React from "react";
import { useIsAuthenticated } from "@azure/msal-react";

const ProtectedPage = () => {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <p>You need to log in to access this page.</p>;
  }

  return <h2>Welcome to the protected page!</h2>;
};

export default ProtectedPage;
