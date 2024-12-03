import React, { useState } from "react";
import "../PostForm.css";

const PostForm = ({ onCreatePost }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [media, setMedia] = useState(null); // Pour accepter image ou vidéo
  const [mediaType, setMediaType] = useState(""); // Type de média (image ou vidéo)
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !body) {
      setError("Title and body are required.");
      return;
    }

    const postData = { title, body, media, mediaType };
    onCreatePost(postData);

    // Réinitialiser les champs après soumission
    setTitle(""); 
    setBody("");
    setMedia(null);
    setMediaType("");
    setError(null);
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      // Détecter le type de fichier (image ou vidéo)
      if (file.type.startsWith("image/")) {
        setMediaType("image");
      } else if (file.type.startsWith("video/")) {
        setMediaType("video");
      }

      reader.onloadend = () => {
        setMedia(reader.result); // Convertir l'image ou vidéo en base64 ou URL
      };

      reader.readAsDataURL(file); // Lire le fichier comme URL
    }
  };

  return (
    <div className="post-form-container">
      <h2>Create a Post</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="post-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a catchy title..."
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Description</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="What do you want to talk about?"
            rows="4"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="media">Upload Image or Video</label>
          <input
            id="media"
            type="file"
            accept="image/*,video/*"  // Accepter image ou vidéo
            onChange={handleMediaChange}
          />
          {media && mediaType === "image" && (
            <div className="preview-container">
              <img src={media} alt="Preview" className="image-preview" />
            </div>
          )}
          {media && mediaType === "video" && (
            <div className="preview-container">
              <video controls className="video-preview">
                <source src={media} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
        <button type="submit" className="submit-btn">
          Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;
