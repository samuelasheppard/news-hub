import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="burger">
        <span></span>
      </div>
      <p className="logo">News Hub</p>
      <ul className={"nav"}>
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
    </>
  );
}

export default Header;
