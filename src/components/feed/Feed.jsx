import React from "react";
import { useSelector } from "react-redux";
import Article from "./Article";

function Feed() {
  const newsArray = useSelector((state) => state.news);

  const articleMap = (array) => {
    return array.map((article) => {
      return <Article key={article.title} data={article} />;
    });
  };
  return (
    <div className="feed-container">
      {newsArray ? (
        articleMap(newsArray)
      ) : (
        <p>News feed is currently unavailable</p>
      )}
    </div>
  );
}

export default Feed;
