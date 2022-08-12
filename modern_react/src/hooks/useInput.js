import { useCallback, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        [action.name]: action.value,
      };
    case "RESET":
      return Object.keys(state).reduce((acc, x) => {
        acc[x] = "";
        return acc;
      }, {});
    default:
      return state;
  }
}
function useInputs(initialForm) {
  const [form, dispatch] = useReducer(reducer, initialForm);
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE",
      name,
      value,
    });
  }, []);
  const onReset = useCallback(() => {
    dispatch({
      type: "RESET",
    });
  }, []);
  return [form, onChange, onReset];
}

export default useInputs;

// 커스텀 Hooks를 만들어서 반복되는 로직을 재사용
// 'use'라는 키워드로 시작하는 파일을 만들고 그 안에 함수를 작성 ('use'로 시작)
// 함수 안에서 useState, useEffect, useReducer, useCallback 등 Hooks를 사용하여
// 원하는 기능을 구현하고, 컴포넌트에서 사용할 값들을 반환
