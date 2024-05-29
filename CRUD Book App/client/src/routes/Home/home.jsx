import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>This is the home page</p>
      <Link to="/createbook">Create a Book</Link>
    </div>
  );
};

export default Home;
