import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="header">
      <div
        className="burger"
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      >
        <span></span>
      </div>
      <p className="logo">News Hub</p>
      <ul className={showMenu ? "nav open" : "nav close"}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to={"/myfeed"}>My Feed+</Link>
        </li>

        <li>
          <Link to={"/account"}>Account</Link>
        </li>
        <li>Log in</li>
      </ul>
    </div>
  );
}

export default Header;
