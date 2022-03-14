import React from "react";
import { useDispatch, useSelector } from "react-redux";

function Article(props) {
  const myFavourites = useSelector((state) => state.myFavourites);
  const dispatch = useDispatch();

  const { title, description, source, url, urlToImage } = props.data;

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
            dispatch({ type: "ADDTOFAVOURITES", payload: source.name });
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
        <p
          onClick={() => {
            window.open(url).focus();
          }}
        >
          No image available - View full article
        </p>
      )}
    </div>
  );
}

export default Article;
