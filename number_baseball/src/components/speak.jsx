import React from "react";

const Speak = ({ answer, result, isOver, isClear }) => {
  return (
    <>
      {isClear && <h2>CLEAR</h2>}
      {isOver && <h2>GAME OVER</h2>}
      {(isClear || isOver) && <h3>답은 {answer} 이였습니다</h3>}
      {!isOver && <h2>{result}</h2>}
    </>
  );
};

export default Speak;
