import React, { useState } from "react";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }
  
    const token = localStorage.getItem("accessToken"); // Récupération du token
    if (!token) {
      setMessage("Please log in first.");
      return;
    }
  
    try {
      const response = await uploadMedia(token, file, { title: "My Upload", type: "photo" });
      setMessage("Upload successful!");
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Upload failed. Try again.");
    }
  };
  

  return (
    <div>
      <h2>Upload a Media File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadForm;
