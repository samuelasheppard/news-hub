import React, { useEffect } from "react";
import Feed from "../components/feed/Feed";
import { useSelector, useDispatch } from "react-redux";

function MyFeed() {
  const newsFeed = useSelector((state) => state.myFeed);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "CREATEMYFEED" });
  }, []);

  return (
    <>
      <Feed newsFeed={newsFeed} />
    </>
  );
}

export default MyFeed;
