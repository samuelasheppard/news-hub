import React, { useState } from "react";
import { Link } from "react-router-dom";
import burgerMenu from "../assets/burger-menu.png";
import menuClose from "../assets/menu-close.png";

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
        {showMenu ? <img src={menuClose} /> : <img src={burgerMenu} />}
      </div>
      <p className="logo">News Hub</p>
      <ul className={showMenu ? "nav open" : "nav close"}>
        <li
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          <Link to="/">Home</Link>
        </li>
        <li
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          <Link to={"/myfeed"}>My Feed+</Link>
        </li>

        <li
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          <Link to={"/account"}>Account</Link>
        </li>
        <li>Log in</li>
      </ul>
    </div>
  );
}

export default Header;
