import React, { useEffect, useState } from 'react';
import { msalInstance, loginRequest } from '../authConfig';
import PostForm from './PostForm'; // Formulaire pour créer des posts
import { createPost } from "../services/api"; // Si non inclus directement dans PostForm
import '../FeedApp.css'; // Importer le fichier CSS
import { Link } from 'react-router-dom'; // Importer Link de react-router-dom

const FeedApp = () => {
  const [posts, setPosts] = useState([]); // État pour stocker les posts
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Vérifie si l'utilisateur est authentifié
  const [error, setError] = useState(null); // Gère les erreurs lors de la création de posts
  const [userNames, setUserNames] = useState({}); // Stocke les noms des utilisateurs
  const [userId, setUserId] = useState(null); // Ajout de userId pour la gestion de l'ID utilisateur
  const [isLoading, setIsLoading] = useState(true); // Ajout de l'état de loading

  const [profile, setProfile] = useState(null); // État pour stocker le profil complet
  const [loading, setLoading] = useState(false); // État pour gérer l'éta
  const getUserName = async (userId, token) => {
    try {
      const url = `https://graph.microsoft.com/v1.0/users/${userId}`;
      console.log('URL de la requête GET pour récupérer l\'utilisateur :', url); // Log de l'URL

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Réponse de la requête GET:', response);
      if (response.ok) {
        const data = await response.json();
        console.log('Profil utilisateur récupéré:', data); // Log du résultat du profil utilisateur
        return data.displayName; // Retourne le nom de l'utilisateur
      } else {
        console.error('Erreur dans la requête GET:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du profil utilisateur:', error);
      return null;
    }
  };

  // Fonction pour récupérer le profil complet de l'utilisateur quand on clique sur le nom
  const getProfile = async (userId) => {
    console.log(`Making GET request for profile with ID: ${userId}`);
  
    const token = await getAccessToken();
    setLoading(true); // Indique que le chargement commence
    setError(null); // Réinitialise les erreurs
  
    if (token) {
      try {
        const response = await fetch(`http://localhost:5000/profiles/${userId}`, { 
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        console.log('Réponse de la requête GET profil:', response);
  
        if (response.ok) {
          const profileData = await response.json(); // Récupère les données JSON
          console.log('Profil complet récupéré:', profileData);
          setProfile(profileData); // Met à jour l'état avec les données du profil
        } else {
          setError('Erreur lors de la récupération du profil');
          console.error('Erreur dans la récupération du profil:', response.status);
        }
      } catch (error) {
        setError('Erreur lors de la récupération du profil');
        console.error('Erreur lors de la récupération du profil:', error);
      } finally {
        setLoading(false); // S'assure que le chargement est terminé
      }
    } else {
      setError("Impossible de récupérer le token d'accès.");
      setLoading(false); // S'assure que le chargement est terminé
    }
  };
  
  const checkAccount = () => {
    const account = msalInstance.getAllAccounts()[0];
    if (account) {
      msalInstance.setActiveAccount(account);
      setIsAuthenticated(true);
      setUserId(account.localAccountId);  // Récupère et stocke l'userId
    } else {
      setIsAuthenticated(false);
    }
  };

  // Récupère un token d'accès à partir de l'authentification MSAL
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

      console.log("Token récupéré :", response.accessToken);
      return response.accessToken;
    } catch (error) {
      console.error('Erreur lors de la récupération du token:', error);
      return null;
    }
  };

  // Gère la connexion de l'utilisateur
  const handleLogin = async () => {
    try {
      const loginResponse = await msalInstance.loginPopup(loginRequest);
      msalInstance.setActiveAccount(loginResponse.account);
      setIsAuthenticated(true);
      setUserId(loginResponse.account.localAccountId); // Stocke l'userId après la connexion
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Récupère les posts du serveur
  const fetchPosts = async () => {
    setIsLoading(true);
    if (!isAuthenticated) {
      await handleLogin();
    }

    const token = await getAccessToken();

    if (token) {
      try {
        const response = await fetch('http://localhost:5000/posts', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPosts(data);

          const authors = {};
          for (const post of data) {
            const name = await getUserName(post.author_id, token);
            authors[post.author_id] = name;
          }
          setUserNames(authors);
        } else {
          console.error('Failed to fetch posts:', response.status);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Crée un post en envoyant des données au backend
  const handleCreatePost = async (postData) => {
    try {
      const token = await getAccessToken();
      if (!token) {
        throw new Error('User is not authenticated. Cannot create post.');
      }

      const activeAccount = msalInstance.getActiveAccount();
      if (!activeAccount) {
        throw new Error('No active account. Please log in.');
      }

      const authorId = userId || activeAccount.localAccountId;
      const dataToSend = {
        ...postData,
        author_id: authorId,
      };

      await createPost(token, dataToSend);

      alert('Post created successfully!');
      fetchPosts();
    } catch (err) {
      console.error('Failed to create post:', err);
      setError('Failed to create post. Please try again.');
    }
  };

  useEffect(() => {
    checkAccount();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated]);

  return (
    <div className="feed-container">
      <div className="feed-header">
        <h1>Feed</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      {isLoading ? (
        <p>Loading..</p>
      ) : (
        <>
          <PostForm onCreatePost={handleCreatePost} />
          <div className="post-list">
            {posts.map((post, index) => (
              <div className="post-card" key={index}>
                <div className="post-content">
                  <h3 className="post-title">{post.title}</h3>

                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post"
                      className="post-image"
                    />
                  )}

                  {post.mediaType === 'video' && post.media && (
                    <video controls className="post-video" style={{ maxWidth: '100%', height: 'auto' }}>
                      <source src={post.media} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}

                  <p className="post-body">{post.body}</p>
                </div>

                <div className="post-footer">
                  <div className="author-details">
                    <h4>
                      <Link
                        to={`/profile/${post.author_id}`}
                        onClick={() => getProfile(post.author_id)} // On clique pour récupérer le profil
                      >
                        {userNames[post.author_id] || 'Unknown Author'}
                      </Link>
                    </h4>
                    <p>{new Date(post.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FeedApp;
