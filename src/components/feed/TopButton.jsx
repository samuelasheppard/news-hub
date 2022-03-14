import React from "react";
import chevron from "../../assets/chevron.png";

function TopButton(props) {
  return (
    <div className="toTop">
      <img
        src={chevron}
        alt={"Top"}
        onClick={() => {
          props.scrollToTop(props.top);
        }}
      />
    </div>
  );
}

export default TopButton;
