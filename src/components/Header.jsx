import React from "react";
import { useDispatch } from "react-redux";

function Header() {
  const dispatch = useDispatch();
  return (
    <div className="header">
      <a>Home</a>
      <a
        onClick={() => {
          dispatch({ type: "CREATEMYFEED" });
        }}
      >
        My Feed+
      </a>
      <p>News Hub</p>
      <a>My Account</a>
      <a>Log in</a>
    </div>
  );
}

export default Header;
