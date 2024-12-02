import React from "react";

const Post = ({ post, likePost }) => {
  return (
    <div style={styles.postContainer}>
      <div style={styles.header}>
        <div style={styles.avatar}></div>
        <div style={styles.userInfo}>
          <h3 style={styles.userName}>{post.author}</h3>
          <p style={styles.date}>
            {post.date.toLocaleDateString()} • {post.date.toLocaleTimeString()}
          </p>
        </div>
      </div>
      <div style={styles.content}>
        <p>{post.content}</p>
      </div>
      <div style={styles.footer}>
        <button style={styles.likeButton} onClick={() => likePost(post.id)}>
          👍 Like ({post.likes})
        </button>
      </div>
    </div>
  );
};

const styles = {
  postContainer: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
    padding: "15px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "#0073b1", // Couleur principale de LinkedIn
    marginRight: "15px",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    margin: "0",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
  },
  date: {
    margin: "0",
    fontSize: "12px",
    color: "#888",
  },
  content: {
    marginBottom: "10px",
    fontSize: "14px",
    color: "#333",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
  },
  likeButton: {
    backgroundColor: "#eef3f8",
    border: "1px solid #d6d9dc",
    borderRadius: "5px",
    padding: "5px 10px",
    fontSize: "14px",
    color: "#0073b1",
    cursor: "pointer",
  },
};

export default Post;
