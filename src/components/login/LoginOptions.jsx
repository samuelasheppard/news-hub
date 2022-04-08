import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ApiController } from "../../controllers/ApiController";

function LoginOptions() {
  const Api = new ApiController();
  const user = useSelector((state) => state.user);
  return (
    <div className="login--container">
      <div className="login--options">
        <Link to="/account">Account</Link>
        <Link to={"/myfeed"}>My Feed+</Link>
        <Link
          to={"/"}
          onClick={() => {
            Api.userLogOut(user.email, user.token);
          }}
        >
          Logout
        </Link>
      </div>
    </div>
  );
}

export default LoginOptions;
