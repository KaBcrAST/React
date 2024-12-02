import React from "react";
import Post from "./Post";

const Feed = ({ posts, likePost }) => {
  return (
    <div style={styles.feedContainer}>
      {posts.map((post) => (
        <Post key={post.id} post={post} likePost={likePost} />
      ))}
    </div>
  );
};

const styles = {
  feedContainer: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f3f2ef", // Couleur de fond LinkedIn
    borderRadius: "8px",
  },
};

export default Feed;
