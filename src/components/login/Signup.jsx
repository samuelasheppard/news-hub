import React, { useState } from "react";
import { Link } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import { utils } from "../../utils";
import { ApiController } from "../../controllers/ApiController";
import { useNavigate } from "react-router-dom";

function Signup() {
  let navigate = useNavigate();
  const Api = new ApiController();

  const [validation, setValidation] = useState({
    name: {},
    email: {},
    password: {},
    passwordRepeat: {},
  });
  const [signUpError, setSignUpError] = useState();

  const createUser = async () => {
    const { name, email, password } = validation;
    const error = await Api.userCreate(name.valid, email.valid, password.valid);
    setSignUpError(error);
    return error;
  };

  return (
    <div className="login--container">
      <div className="login--form">
        <h3 className="login--grid--span">Sign Up</h3>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          onInput={(e) => {
            setValidation({ ...validation, name: utils.validateUsername(e) });
          }}
        />
        {validation.name.error && (
          <ErrorMessage
            message={validation.name.message}
            styleString={"login--signup login--grid--span login--error"}
          />
        )}
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          onInput={(e) => {
            setValidation({ ...validation, email: utils.validateEmail(e) });
          }}
        />
        {validation.email.error && (
          <ErrorMessage
            message={validation.email.message}
            styleString={"login--signup login--grid--span login--error"}
          />
        )}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onInput={(e) => {
            setValidation({
              ...validation,
              password: utils.validatePassword(e),
            });
          }}
        />
        {validation.password.error && (
          <ErrorMessage
            message={validation.password.message}
            styleString={"login--signup login--grid--span login--error"}
          />
        )}
        <label htmlFor="passwordRepeat">Repeat password</label>
        <input
          type="password"
          name="passwordRepeat"
          onInput={(e) => {
            setValidation({
              ...validation,
              passwordRepeat: utils.validatePasswordRepeat(
                e,
                validation.password.valid
              ),
            });
          }}
        />
        {validation.passwordRepeat.error && (
          <ErrorMessage
            message={validation.passwordRepeat.message}
            styleString={"login--signup login--grid--span login--error"}
          />
        )}
        {signUpError && (
          <ErrorMessage
            message={signUpError}
            styleString={"login--signup login--grid--span login--error"}
          />
        )}
        {Object.values(validation).every((item) => item.valid) && (
          <button
            type="submit"
            className="login--grid--span"
            onClick={async () => {
              const userCreationError = await createUser();
              if (!userCreationError) {
                navigate("/login");
              }
            }}
          >
            Sign Up
          </button>
        )}

        <div className="login--signup login--grid--span">
          <Link to="/login">Already registered? Click here</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
