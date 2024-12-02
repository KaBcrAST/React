import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post('http://localhost:5000/api/posts', {
        title,
        content,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      alert('Post created successfully');
    } catch (error) {
      console.error('Error creating post', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <textarea 
        placeholder="Content" 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
      />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost;
