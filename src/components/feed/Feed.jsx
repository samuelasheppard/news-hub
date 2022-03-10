import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import Article from "./Article";
import TopButton from "./TopButton";

function Feed() {
  const [isVisible, setIsVisible] = useState(false);
  const newsArray = useSelector((state) => state.news);
  const top = useRef();

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

  const scrollToTop = () => {
    top.current.scrollTo(0, 0);
  };

  return (
    <div
      ref={top}
      className="feed-container"
      onScroll={(e) => {
        detectScroll(e);
      }}
    >
      {newsArray ? (
        articleMap(newsArray)
      ) : (
        <p>News feed is currently unavailable</p>
      )}
      {isVisible === true && <TopButton scrollToTop={scrollToTop} />}
    </div>
  );
}

export default Feed;
