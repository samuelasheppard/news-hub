import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import burgerMenu from "../assets/burger-menu.png";
import menuClose from "../assets/menu-close.png";
import { ApiController } from "../controllers/ApiController";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const Api = new ApiController();
  const user = useSelector((state) => state.user);

  return (
    <div className="header">
      <div
        className="burger"
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      >
        {showMenu ? (
          <img src={menuClose} alt="burger" />
        ) : (
          <img src={burgerMenu} alt="burger" />
        )}
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
          {loggedIn === true ? (
            <Link to={"/account"}>Account</Link>
          ) : (
            <Link to={"/login"}>Account</Link>
          )}
        </li>
        <li
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          {loggedIn === true ? (
            <Link
              to={"/"}
              onClick={async () => {
                await Api.userLogOut(user.email, user.token);
              }}
            >
              Logout
            </Link>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Header;
