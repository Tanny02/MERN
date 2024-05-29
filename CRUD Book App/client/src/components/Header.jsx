import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <h1>
          <i>Book App</i>
        </h1>
      </Link>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/books">Books</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  );
};

export default Header;
