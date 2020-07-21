import React from "react";
import "./button.css";

const Button = ({ initial = 1, text, onClick }) => {
  return (
    <div className='pagination-index' role='button' onClick={()=> onClick(initial+1)} >
     {text}
    </div>
  );
};

export default Button;
