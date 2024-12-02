import axios from "axios";

const API_BASE_URL = "http://localhost:5000/posts";

const getAuthHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


export const createPost = async (token, postData) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Ajoute le token si besoin
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create post: ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Error creating post:", err);
    throw err;
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
    const response = await fetch("http://localhost:3000/api/posts");
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    return response.json();
  };
  

  
  

  export async function fetchUserPosts(token, authorId) {
    try {
      const response = await axios.get(`http://localhost:3000/api/my-posts?author_id=${authorId}`, {
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
