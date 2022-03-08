import React from "react";

function Article(props) {
  const { title, description, source, url, urlToImage, content } = props.data;

  return (
    <div className="feed--article">
      <h2>{title}</h2>
      <p>{description}</p>
      <a href={url} target="_blank">
        Full Article
      </a>
      <img
        src={urlToImage}
        alt={title}
        onClick={() => {
          window.open(url).focus();
        }}
      />
    </div>
  );
}

export default Article;
