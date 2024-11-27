// src/Callback.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { msalInstance } from './authConfig';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    msalInstance.handleRedirectPromise()
      .then((response) => {
        if (response) {
          console.log('Connexion réussie : ', response);
          navigate('/protected');
        }
      })
      .catch((error) => {
        console.error('Erreur de connexion : ', error);
      });
  }, [navigate]);

  return <div>Chargement...</div>;
};

export default Callback;
