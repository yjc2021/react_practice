import React, { useState } from "react";

const InputSample = (props) => {
  const [text, setText] = useState("");
  // 변경되는 값은 useState으로 관리

  const onChange = (e) => {
    setText(e.target.value);
  };
  // 이벤트에 등록하는 함수에서 이벤트 객체 e를 파라미터로 받아와서 사용할 수 있음
  // e.target은 이벤트가 발생한 DOM인 input DOM을 가리킴
  // e.target.value를 조회하면 현재 input에 입력한 값을 알 수 있음

  const onReset = () => {
    setText("");
  };

  return (
    <div>
      <input onChange={onChange} value={text} />
      {/*input DOM의 상태를 관리하기 위해서 input 태그의 value값을 text state으로 설정*/}
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: {text}</b>
      </div>
    </div>
  );
};

export default InputSample;
