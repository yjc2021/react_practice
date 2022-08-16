import React from "react";

const BaseballInput = ({ prediction, setPrediction }) => {
  console.log("input");
  const onChange = (e) => {
    setPrediction(e.target.value);
  };
  return (
    <input
      type="text"
      size={30}
      maxLength={4}
      placeholder="서로 다른 4개 숫자를 입력하세요"
      value={prediction}
      onChange={onChange}
      required
    />
  );
};

export default React.memo(BaseballInput);
