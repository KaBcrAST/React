import React from "react";

const Home = ({ user }) => {
  return (
    <div>
      <h1>Welcome, {user?.displayName || "User"}!</h1>
      <p>Email: {user?.email || "Not available"}</p>
    </div>
  );
};

export default Home;
