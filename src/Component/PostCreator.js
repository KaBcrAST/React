import React, { useState } from 'react';
import axios from 'axios';

const PostCreator = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('author_id', 'user_id'); // Remplacez par l'ID de l'utilisateur connecté
    if (file) {
      formData.append('media', file);
    }

    try {
      const response = await axios.post('http://localhost:3000/add-post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Post created successfully', response.data);
    } catch (error) {
      console.error('Error creating post:', error.response.data);
    }
  };

  return (
    <div>
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="media">Upload an Image</label>
          <input
            type="file"
            id="media"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default PostCreator;
