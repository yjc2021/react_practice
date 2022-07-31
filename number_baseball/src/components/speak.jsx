import React from "react";

const Speak = ({ result, isOver, isClear }) => {
  return (
    <>
      {isClear && <h2>CLEAR</h2>}
      {isOver && <h2>GAME OVER</h2>}
      {!isOver && <h2>{result}</h2>}
    </>
  );
};

export default Speak;
