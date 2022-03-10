import React, { useState } from "react";
import { useSelector } from "react-redux";
import Article from "./Article";
import TopButton from "./TopButton";

function Feed() {
  const [isVisible, setIsVisible] = useState(false);
  const newsArray = useSelector((state) => state.news);

  const articleMap = (array) => {
    return array.map((article) => {
      return <Article key={article.title} data={article} />;
    });
  };

  const detectScroll = (e) => {
    if (e.target.scrollTop < e.target.clientHeight) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  return (
    <div
      className="feed-container"
      onScroll={(e) => {
        detectScroll(e);
      }}
    >
      <div className={"top"} id={"top"}></div>
      {newsArray ? (
        articleMap(newsArray)
      ) : (
        <p>News feed is currently unavailable</p>
      )}
      {isVisible === true && <TopButton />}
    </div>
  );
}

export default Feed;
