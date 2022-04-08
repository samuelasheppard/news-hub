import React from "react";
import Details from "./Details";
import Favourites from "./Favourites";

function MyAccount() {
  return (
    <div className="myAccount--container">
      <Details />
      <Favourites />
    </div>
  );
}

export default MyAccount;
