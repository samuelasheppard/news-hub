import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <ul className="header">
      <Link to="/">
        <li>Home</li>
      </Link>
      <Link to={"/myfeed"}>
        <li>My Feed+</li>
      </Link>
      <p>News Hub</p>
      <Link to={"/account"}>
        <li>Account</li>
      </Link>
      <li>Log in</li>
    </ul>
  );
}

export default Header;
