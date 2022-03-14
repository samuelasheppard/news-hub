import React from "react";
import ArticleContainer from "../components/feed/ArticleContainer";
import { useSelector } from "react-redux";
import favicon from "../assets/favicon.png";

function Feeds(props) {
  let news = useSelector((state) => state.news);
  const myFavourites = useSelector((state) => state.myFavourites);

  if (myFavourites && props.filter === true) {
    news = news.filter((item) => {
      return myFavourites.indexOf(item.source.name) > -1;
    });
  }

  return (
    <>
      {!myFavourites && props.filter === true && (
        <p>No favourites selected. Please log in.</p>
      )}
      {news ? (
        <ArticleContainer newsFeed={news} />
      ) : (
        <div className="error news">
          <p>News feed is currently unavailable</p>
          <img src={favicon} alt={"news icon"} />
        </div>
      )}
    </>
  );
}

export default Feeds;
