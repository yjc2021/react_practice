import React from "react";

const BaseballHistory = ({ history }) => {
  console.log("history");
  return (
    <div>
      <h3>히스토리</h3>
      {history.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
};

export default React.memo(BaseballHistory);
