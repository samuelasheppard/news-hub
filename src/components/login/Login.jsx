import React from "react";
import { useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import LoginOptions from "./LoginOptions";

function Login() {
  const loggedIn = useSelector((state) => state.user.loggedIn);

  return <>{loggedIn === true ? <LoginOptions /> : <LoginForm />}</>;
}

export default Login;
