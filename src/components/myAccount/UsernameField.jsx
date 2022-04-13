import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ApiController } from "../../controllers/ApiController";
import { utils } from "../../utils";
import ErrorMessage from "../login/ErrorMessage";

function UsernameField() {
  const user = useSelector((state) => state.user);
  const [edit, setEdit] = useState(false);
  const [newData, setNewData] = useState();
  const Api = new ApiController();
  const [validation, setValidation] = useState({});

  const saveNewdetails = () => {
    if (validation.error) {
      setValidation({});
      return;
    }
    Api.userEditDetails(user.email, user.token, "name", newData);
  };

  return (
    <>
      <p className="details--grid--span">Name</p>
      {validation.error && (
        <ErrorMessage
          message={validation.message}
          styleString={"details--grid--span"}
        />
      )}
      {edit ? (
        <>
          <input
            type="text"
            className="details--edit"
            placeholder={user.name}
            onInput={(e) => {
              const test = utils.validateUsername(e);
              setValidation(test);
              if (test.valid) {
                setNewData(e.target.value);
              }
            }}
          />
        </>
      ) : (
        <p>{user.name}</p>
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

export default UsernameField;
