import React from "react";
import { useDispatch, useSelector } from "react-redux";

function Article(props) {
  const myFeed = useSelector((state) => state.myFeed);
  const dispatch = useDispatch();

  const { title, description, source, url, urlToImage } = props.data;

  return (
    <div className="feed--article">
      <div className="feed--article--head">
        <div className="feed--article--info">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div
          className="feed--article--follow"
          onClick={() => {
            dispatch({ type: "ADDTOFEED", payload: source.name });
          }}
        >
          {myFeed.includes(source.name) ? "-" : "+"} {source.name}
        </div>
      </div>
      <img
        src={urlToImage}
        alt={title}
        onClick={() => {
          window.open(url).focus();
        }}
      />
    </div>
  );
}

export default Article;
