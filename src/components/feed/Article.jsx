import React from "react";
import { useSelector } from "react-redux";
import { ApiController } from "../../controllers/ApiController";
import noImage from "../../assets/noImage.png";

function Article(props) {
  const myFavourites = useSelector((state) => state.myFavourites);
  const user = useSelector((state) => state.user);
  const Api = new ApiController();
  const { title, description, source, url, urlToImage } = props.data;

  const toggleFavourite = () => {
    if (user.loggedIn && myFavourites.includes(source.name)) {
      console.log("remove");
      Api.userRemoveFavourite(user.email, user.token, source.name);
    } else if (user.loggedIn && !myFavourites.includes(source.name)) {
      console.log("add");
      Api.userAddFavourite(user.email, user.token, source.name);
    }
  };

  return (
    <div className="feed--article">
      <div className="feed--article--head">
        <div
          className="feed--article--info"
          onClick={() => {
            window.open(url).focus();
          }}
        >
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div
          className="feed--article--follow"
          onClick={() => {
            toggleFavourite();
          }}
        >
          {myFavourites && myFavourites.includes(source.name) ? "-" : "+"}{" "}
          {source.name}
        </div>
      </div>
      {urlToImage ? (
        <img
          src={urlToImage}
          alt={title}
          onClick={() => {
            window.open(url).focus();
          }}
        />
      ) : (
        <img src={noImage} alt="No image available" />
      )}
    </div>
  );
}

export default Article;

{
  /* <p
          className="error image"
          onClick={() => {
            window.open(url).focus();
          }}
        >
          No image available - View full article
        </p> */
}
