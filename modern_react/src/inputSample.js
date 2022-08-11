import React, { useRef, useState } from "react";
const InputSample = () => {
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
  });
  const nameInput = useRef();
  // 1. useRef를 사용하여 Ref객체를 만들고

  const { name, nickname } = inputs; // 객체 비구조화 할당

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value로 설정
    });
  };

  const onReset = () => {
    setInputs({
      name: "",
      nickname: "",
    });
    nameInput.current.focus();
    // 3. Ref객체의 .current 값은 선택한 DOM을 가리킴
  };

  return (
    <div>
      <input
        placeholder="이름"
        name="name"
        onChange={onChange}
        value={name}
        ref={nameInput}
        // 2. 선택하고 싶은 DOM에 ref값으로 설정
      />
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
