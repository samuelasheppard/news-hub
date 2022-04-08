import React from "react";
import ArticleContainer from "./ArticleContainer";
import { useSelector } from "react-redux";
import favicon from "../../assets/favicon.png";

function Feeds(props) {
  let news = useSelector((state) => state.news) || [];
  const myFavourites = useSelector((state) => state.myFavourites);
  const loggedIn = useSelector((state) => state.user.loggedIn);

  if (myFavourites && props.filter === true) {
    news = news.filter((item) => {
      return myFavourites.indexOf(item.source.name) > -1;
    });
  }

  return (
    <>
      {loggedIn && props.filter && myFavourites && myFavourites.length === 0 && (
        <div className="error news">
          <p>No Favourite news sources selected</p>
          <img src={favicon} alt={"news icon"} />
        </div>
      )}
      {news ? (
        <ArticleContainer newsFeed={news} filter={props.filter} />
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
