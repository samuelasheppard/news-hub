import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ApiController } from "../../controllers/ApiController";
import { utils } from "../../utils";
import ErrorMessage from "../login/ErrorMessage";

function EmailField() {
  const user = useSelector((state) => state.user);
  const [edit, setEdit] = useState(false);
  const [newData, setNewData] = useState();
  const Api = new ApiController();
  const [validation, setValidation] = useState({});
  const [emailError, setEmailError] = useState();

  const saveNewdetails = async () => {
    setEmailError();
    if (validation.error) {
      setValidation({});
      return;
    }
    const resp = await Api.userEditDetails(
      user.email,
      user.token,
      "email",
      newData
    );
    if (resp.status === 0) {
      setEmailError(resp);
    }
  };

  return (
    <>
      <p className="details--grid--span">Email</p>
      {validation.error && (
        <ErrorMessage
          message={validation.message}
          styleString={"details--grid--span"}
        />
      )}
      {emailError && (
        <ErrorMessage
          message={`${emailError.message} - email may already be in use`}
          styleString={"details--grid--span"}
        />
      )}
      {edit ? (
        <>
          <input
            type="text"
            className="details--edit"
            placeholder={user.email}
            onInput={(e) => {
              const test = utils.validateEmail(e);
              setValidation(test);
              if (test.valid) {
                setNewData(e.target.value);
              }
            }}
          />
        </>
      ) : (
        <p>{user.email}</p>
      )}
      {edit ? (
        <button
          onClick={(e) => {
            setEdit(false);
            saveNewdetails(e);
          }}
        >
          {!validation.valid ? "cancel" : "save"}
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
    </>
  );
}

export default EmailField;
