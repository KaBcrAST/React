import React, { useState } from "react";

const PostForm = ({ onCreatePost }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postData = { title, body };
      await onCreatePost(postData);

      // Réinitialise les champs après succès
      setTitle("");
      setBody("");
    } catch (err) {
      console.error(err);
      setError("Failed to create post. Please try again.");
    }
  };

  return (
    <div>
      <h2>Create a Post</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Body:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostForm;
