import React, { useEffect, useState } from 'react';
import { msalInstance, loginRequest } from '../authConfig';
import PostForm from './PostForm'; // Assure-toi que le chemin est correct
import { createPost } from "../services/api"; // Si non inclus directement dans PostForm

const FeedApp = () => {
  const [posts, setPosts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  // Fonction pour vérifier si un utilisateur est déjà connecté
  const checkAccount = () => {
    const account = msalInstance.getAllAccounts()[0];
    if (account) {
      msalInstance.setActiveAccount(account); // Définir le compte actif
      setIsAuthenticated(true); // L'utilisateur est authentifié
    } else {
      setIsAuthenticated(false);
    }
  };

  // Fonction pour obtenir le token d'accès
  const getAccessToken = async () => {
    try {
      const account = msalInstance.getActiveAccount();
      if (!account) {
        throw new Error('No active account set. Please log in first.');
      }

      const response = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: account,
      });

      return response.accessToken;
    } catch (error) {
      console.error('Error acquiring token:', error);
      return null;
    }
  };

  // Fonction pour gérer la connexion
  const handleLogin = async () => {
    try {
      const loginResponse = await msalInstance.loginPopup(loginRequest);
      msalInstance.setActiveAccount(loginResponse.account);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Fonction pour récupérer les posts depuis le backend
  const fetchPosts = async () => {
    if (!isAuthenticated) {
      await handleLogin(); // Si l'utilisateur n'est pas authentifié, lancer le login
    }

    const token = await getAccessToken();

    if (token) {
      try {
        const response = await fetch('http://localhost:5000/posts', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Ajoutez le token dans l'en-tête Authorization
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error('Failed to fetch posts:', response.status);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
  };

  // Fonction pour ajouter un nouveau post
  const handleCreatePost = async (postData) => {
    try {
      const token = await getAccessToken();
      if (!token) {
        throw new Error('User is not authenticated. Cannot create post.');
      }
  
      // Récupérer l'utilisateur actuellement connecté
      const activeAccount = msalInstance.getActiveAccount();
      if (!activeAccount) {
        throw new Error('No active account. Please log in.');
      }
  
      const authorId = activeAccount.localAccountId; // Récupérer le `author_id`
  
      // Ajouter `author_id` au postData
      const dataToSend = {
        ...postData,
        author_id: authorId,
      };
  
      // Appel API pour créer un post
      await createPost(token, dataToSend);
  
      alert('Post created successfully!');
  
      // Recharge les posts après création
      fetchPosts();
    } catch (err) {
      console.error('Failed to create post:', err);
      setError('Failed to create post. Please try again.');
    }
  };
  

  useEffect(() => {
    checkAccount(); // Vérifie si l'utilisateur est connecté
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts(); // Si l'utilisateur est authentifié, récupérer les posts
    }
  }, [isAuthenticated]);

  return (
    <div>
      <h1>Posts</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {isAuthenticated ? (
        <>
          <PostForm onCreatePost={handleCreatePost} /> {/* Ajout du formulaire */}
          <ul>
            {posts.map((post, index) => (
              <li key={index}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>You must log in to view posts.</p>
      )}
    </div>
  );
};

export default FeedApp;
