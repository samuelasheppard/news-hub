import React, { useState, useRef, useEffect } from "react";
import Article from "./Article";
import TopButton from "./TopButton";
import favicon from "..//../assets/favicon.png";
import { useDispatch } from "react-redux";

function Feed(props) {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const top = useRef();
  const { newsFeed } = props;

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

  const detectEnd = (e) => {
    const { scrollTop, scrollHeight, offsetHeight } = e.target;
    console.log(
      scrollTop,
      "+",
      offsetHeight,
      "=",
      Math.ceil(scrollTop + offsetHeight),
      ">=",
      scrollHeight
    );

    if (Math.ceil(scrollTop + offsetHeight) >= scrollHeight) {
      dispatch({ type: "INCREMENTPAGE" });
    }
  };

  const scrollToTop = () => {
    top.current.scrollTo(0, 0);
  };

  return (
    <div
      ref={top}
      className={newsFeed && newsFeed.length > 0 ? "feed-container" : undefined}
      onScroll={(e) => {
        detectScroll(e);
        detectEnd(e);
      }}
    >
      {newsFeed && newsFeed.length > 0 ? (
        articleMap(newsFeed)
      ) : (
        <div className="error news">
          <p>News feed is currently unavailable</p>
          <img src={favicon} alt={"news icon"} />
        </div>
      )}
      {isVisible === true && <TopButton scrollToTop={scrollToTop} />}
    </div>
  );
}

export default Feed;
