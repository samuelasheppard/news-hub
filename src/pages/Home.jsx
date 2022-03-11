import Feed from "../components/feed/Feed";
import React from "react";
import { useSelector } from "react-redux";

function Home() {
  const newsFeed = useSelector((state) => state.news);
  return (
    <>
      <Feed newsFeed={newsFeed} />
    </>
  );
}

export default Home;
