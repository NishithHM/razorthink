import React from "react";
import { useHistory } from "react-router-dom";
import "./card.css";
const ImageCard = ({ url,id }) => {
  const history = useHistory();
  return (
    <div
      role="button"
      className="image-card"
      style={{ backgroundImage: `url(${url.thumb})` }}
      onClick={() => history.push(`/modal`,[{url:url.regular, id: id}])}
    />
  );
};

export default ImageCard;
