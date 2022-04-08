import React from "react";

function ErrorMessage(props) {
  const { message, style } = props;
  return <div className={style}>{message}</div>;
}

export default ErrorMessage;
