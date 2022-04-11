import React, { useState } from "react";
import { ApiController } from "../../controllers/ApiController";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ErrorMessage from "./ErrorMessage";

function LoginForm() {
  const [credentials, setCredentials] = useState();
  const Api = new ApiController();
  const logInError = useSelector((state) => state.user.logInError);

  return (
    <div className="login--container">
      <div className="login--form">
        <h3 className="login--grid--span">Login</h3>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          onInput={(e) => {
            setCredentials({ ...credentials, email: e.target.value });
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              Api.userLogIn(credentials);
            }
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onInput={(e) => {
            setCredentials({ ...credentials, password: e.target.value });
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              Api.userLogIn(credentials);
            }
          }}
        />
        <button
          type="submit"
          className="login--grid--span"
          onClick={() => {
            Api.userLogIn(credentials);
          }}
        >
          Sign In
        </button>
        {logInError === true && (
          <ErrorMessage
            message={"Invalid credentials"}
            styleString={"login--signup login--grid--span login--error"}
          />
        )}
        <div className="login--signup login--grid--span">
          <Link to="/signup">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
