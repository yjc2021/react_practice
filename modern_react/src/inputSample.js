import React, { useState } from "react";

const InputSample = () => {
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
  });
  // input이 여러개일 때는 각 input에 대하여 개별적인 useState과 onChange를 만들어서 구현하는 것은 비효율적
  // 더 나은 방법은 useState에서 하나의 객체형태의 상태를 관리하고
  // 각 input에 name attribute을 설정하고 이벤트가 발생했을 때 해당 name만 참조하는 것이다

  const { name, nickname } = inputs; // 객체 비구조화 할당

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value로 설정
    });
  };

  // 리액트에서 state을 수정할 때 불변성을 지켜야 한다
  // state 수정 시 기존 객체를 수정하는 것이 아닌 새로운 수정된 객체를 만들어야 함
  // 불변성을 지켜주어야만 컴포넌트 상태가 없데이트 됐음을 감지하고 필요한 리렌더링이 진행
  const onReset = () => {
    setInputs({
      name: "",
      nickname: "",
    });
  };

  return (
    <div>
      <input placeholder="이름" name="name" onChange={onChange} value={name} />
      <input
        placeholder="닉네임"
        name="nickname"
        onChange={onChange}
        value={nickname}
      />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
  );
};

export default InputSample;
