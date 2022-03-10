import React from "react";
import chevron from "../../assets/chevron.png";

function TopButton() {
  return (
    <a href={"#top"} className="toTop">
      <img src={chevron} alt={"back to top"} />
    </a>
  );
}

export default TopButton;
