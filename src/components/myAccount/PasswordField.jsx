import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ApiController } from "../../controllers/ApiController";
import { utils } from "../../utils";
import ErrorMessage from "../login/ErrorMessage";

function PasswordField() {
  const user = useSelector((state) => state.user);
  const [edit, setEdit] = useState(false);
  const [newData, setNewData] = useState();
  const Api = new ApiController();
  const [validation, setValidation] = useState({});

  const saveNewdetails = () => {
    if (validation.error || !validation.repeatPasswordSuccess) {
      setValidation({});
      return;
    }
    Api.userEditDetails(user.email, user.token, "password", newData);
  };

  return (
    <>
      <p className="details--grid--span">Password</p>
      {validation.error && (
        <ErrorMessage
          message={validation.message}
          styleString={"details--grid--span"}
        />
      )}
      {!validation.repeatPasswordSuccess && newData && (
        <ErrorMessage
          message={"passwords must match"}
          styleString={"details--grid--span"}
        />
      )}
      {edit ? (
        <>
          <input
            type="password"
            className="details--edit"
            placeholder="New Password"
            onInput={(e) => {
              const test = utils.validatePassword(e);
              setValidation(test);
              if (test.valid) {
                setNewData(e.target.value);
              }
            }}
          />
        </>
      ) : (
        <p>***********</p>
      )}
      {edit ? (
        <button
          onClick={(e) => {
            setEdit(false);
            saveNewdetails(e);
          }}
        >
          {!validation.valid || !validation.repeatPasswordSuccess
            ? "cancel"
            : "save"}
        </button>
      ) : (
        <button
          onClick={() => {
            setEdit(true);
          }}
        >
          change
        </button>
      )}
      {edit && (
        <input
          type="password"
          className="details--edit"
          placeholder="Repeat password"
          onInput={(e) => {
            if (e.target.value !== newData) {
              setValidation({ ...validation, repeatPasswordSuccess: false });
            } else {
              setValidation({ ...validation, repeatPasswordSuccess: true });
            }
          }}
        />
      )}
    </>
  );
}

export default PasswordField;
