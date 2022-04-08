import React from "react";
import UsernameField from "./UsernameField";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";

function Details() {
  return (
    <div className="myAccount--section--container">
      <h3>Details</h3>
      <div className="myAccount--details">
        <>
          <UsernameField />
          <EmailField />
          <PasswordField />
        </>
      </div>
    </div>
  );
}

export default Details;
