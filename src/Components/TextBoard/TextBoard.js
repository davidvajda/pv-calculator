import React from "react";

const TextBoard = ({ header, text_array }) => {
  return (
    <div className="text-board">
      <div className="text-board-header">{header}</div>
      {
        text_array.map((text, idx) => <div key={idx} className="text-board-text">{text}</div>)
      }
    </div>
  );
};

export default TextBoard;
