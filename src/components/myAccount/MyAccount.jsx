import React, { useEffect } from "react";
import Details from "./Details";
import Favourites from "./Favourites";
import { useSelector } from "react-redux";
import { ApiController } from "../../controllers/ApiController";

function MyAccount() {
  const user = useSelector((state) => state.user);
  const Api = new ApiController();

  useEffect(() => {
    Api.userGetFavourites(user.email, user.token);
    Api.getUserDetails(user.email, user.token);
  }, []);

  return (
    <div className="myAccount--container">
      <Details />
      <Favourites />
    </div>
  );
}

export default MyAccount;
