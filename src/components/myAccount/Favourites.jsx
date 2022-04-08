import React from "react";
import { useSelector } from "react-redux";
import { ApiController } from "../../controllers/ApiController";
function Favourites() {
  const myFavourites = useSelector((state) => state.myFavourites);
  const user = useSelector((state) => state.user);
  const Api = new ApiController();

  const removeFavourite = (e) => {
    Api.userRemoveFavourite(user.email, user.token, e.target.textContent);
  };

  const favouritesMap = () => {
    return myFavourites.map((item, key) => {
      return (
        <p
          value={item}
          key={key}
          onClick={(e) => {
            removeFavourite(e);
          }}
        >
          {item}
        </p>
      );
    });
  };

  return (
    <div className="myAccount--section--container">
      <h3>Favourite Sources</h3>
      <div className="myAccount--favourites">
        {myFavourites && myFavourites.length > 0 ? (
          favouritesMap()
        ) : (
          <p>no favourites :(</p>
        )}
      </div>
      <p>Click to remove</p>
    </div>
  );
}

export default Favourites;
