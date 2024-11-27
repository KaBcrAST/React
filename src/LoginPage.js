// src/LoginPage.js

import React from 'react';

const LoginPage = ({ login }) => {
  return (
    <div>
      <h1>Se connecter avec Azure AD</h1>
      <button onClick={login}>Se connecter</button>
    </div>
  );
};

export default LoginPage;
