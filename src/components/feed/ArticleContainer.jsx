import React, { useState, useRef } from "react";
import Article from "./Article";
import TopButton from "./TopButton";
import favicon from "..//../assets/favicon.png";
import { useSelector } from "react-redux";
import { ScrollController } from "../../controllers/ScrollController";

function ArticleContainer(props) {
  const [isVisible, setIsVisible] = useState(false);
  const fetching = useSelector((state) => state.fetching);
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const top = useRef();
  const Scroll = new ScrollController();
  const { newsFeed, filter } = props;

  const articleMap = (array) => {
    return array.map((article) => {
      return <Article key={article.title} data={article} />;
    });
  };

  return (
    <>
      <div
        ref={top}
        className="feed--container"
        onScroll={(e) => {
          setIsVisible(Scroll.detectScroll(e));
          Scroll.detectEnd(e, fetching);
        }}
      >
        {filter === true && loggedIn === false && (
          <div className="error news">
            <p>Not logged in. Please log in to view your feed.</p>
            <img src={favicon} alt={"news icon"} />
          </div>
        )}
        {articleMap(newsFeed)}

        {isVisible === true && (
          <TopButton scrollToTop={Scroll.scrollToTop} top={top} />
        )}
      </div>
      {fetching === true && (
        <div className="fetching">
          <img src={favicon} alt="Loading" />
        </div>
      )}
    </>
  );
}

export default ArticleContainer;
