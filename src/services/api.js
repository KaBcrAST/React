import axios from "axios";

const API_BASE_URL = "http://localhost:5000/posts";

const getAuthHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


const getUserName = async (userId, token) => {
  try {
    const response = await fetch(`https://graph.microsoft.com/v1.0/users/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.displayName; // Retourne le nom de l'utilisateur
    } else {
      console.error('Error fetching user data:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};


export const createPost = async (token, postData) => {
  try {
    const response = await fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', // Envoyer les données au format JSON
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create post: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};



  

  export async function uploadMedia(token, file, postData) {
    const formData = new FormData();
    formData.append("media", file);  // Ajouter le fichier
    formData.append("title", postData.title);  // Ajouter le titre du post
    formData.append("body", postData.body);  // Ajouter le corps du post
    formData.append("author_id", postData.author_id);  // Ajouter l'ID de l'auteur
  
    try {
      const response = await axios.post('http://localhost:3000/add-post', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"  // Important pour envoyer des fichiers
        }
      });
      return response.data;  // Retourne l'URL du fichier téléchargé
    } catch (err) {
      console.error("Error uploading media:", err.response?.data || err.message);
      throw err;
    }
  }
  
 
  export const fetchAllPosts = async () => {
    const response = await fetch("http://localhost:3000/posts");
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    return response.json();
  };
  

  
  

  export async function fetchUserPosts(token, authorId) {
    try {
      const response = await axios.get(`http://localhost:3000/my-posts?author_id=${authorId}`, {
        headers: {
          Authorization: `Bearer ${token}`  // Ajout du token OAuth dans les headers
        }
      });
      return response.data;
    } catch (err) {
      console.error('Error fetching posts:', err.response?.data || err.message);
      throw err;
    }
  }
  
  ;
