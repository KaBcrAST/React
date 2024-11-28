import React from 'react';
import { useAuth } from './AuthProvider';

const LoginPage = () => {
  const { login } = useAuth();

  const handleLogin = async () => {
    console.log('Tentative de connexion...');
    try {
      await login();
    } catch (error) {
      console.error('Erreur de connexion : ', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Se connecter à l'application</h1>
      <button style={styles.button} onClick={handleLogin}>
        Se connecter avec Azure AD
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#0078d4',  // Couleur Azure
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};

export default LoginPage;
