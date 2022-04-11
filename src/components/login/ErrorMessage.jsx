import React from "react";

function ErrorMessage(props) {
  const { message, styleString } = props;
  return <div className={styleString}>{message}</div>;
}

export default ErrorMessage;
