import React from "react";
import { scroller } from "react-scroll";
import { useSelector } from "react-redux";
import Article from "./Article";
import TopButton from "./TopButton";

function Feed() {
  const newsArray = useSelector((state) => state.news);

  const articleMap = (array) => {
    return array.map((article) => {
      return <Article key={article.title} data={article} />;
    });
  };
  return (
    <div className="feed-container">
      <div className={"top"} id={"top"}></div>
      {newsArray ? (
        articleMap(newsArray)
      ) : (
        <p>News feed is currently unavailable</p>
      )}
      <TopButton />
    </div>
  );
}

export default Feed;
