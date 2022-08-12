import { useCallback, useMemo, useReducer, useRef, useState } from "react";
import UserList from "./userList";
import CreateUser from "./createUser";
import useInputs from "./hooks/useInput";

const countActiveUsers = (users) => {
  console.log("활성 사용자 수를 세는 중...");
  return users.filter((user) => user.active).length;
};

const initialState = {
  inputs: {
    username: "",
    email: "",
  },
  users: [
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
      active: false,
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
      active: false,
    },
  ],
};
const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_USER":
      return {
        users: state.users.concat(action.user),
      };
    case "TOGGLE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, active: !user.active } : user
        ),
      };
    case "REMOVE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    default:
      return state;
  }
};
function App() {
  const [{ username, email }, onChange, reset] = useInputs({
    username: "",
    email: "",
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const { users } = state;

  const onCreate = useCallback(() => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    reset();
    nextId.current += 1;
  }, [username, email, reset]);
  const onToggle = useCallback((id) => {
    dispatch({
      type: "TOGGLE_USER",
      id,
    });
  }, []);
  const onRemove = useCallback((id) => {
    dispatch({
      type: "REMOVE_USER",
      id,
    });
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
      <div>활성사용자 수: {count}</div>
    </>
  );
}

export default App;

// useReducer: 상태 업데이트 로직을 컴포넌트로부터 분리
// useState과 다르게 컴포넌트 바깥에 작성 & 다른 파일에 작성 후 불러와서 사용 가능
/* function reducer(state, action) {
    //새로운 상태를 만드는 로직
    // const nextState=...
    return nextState;
  } 
  */
// reducer 함수: 현재 state와 action 객체를 파라미터로 받아와서 새로운 state을 반환
// reducer에서 반환하는 상태는 곧 컴포넌트가 지닐 새로운 state

// action: 업데이트를 위한 정보
// type값을 지닌 객체 형태로 사용

// const [state, dispatch] = useReducer(reducer, initialState);
// state은 앞으로 컴포넌트에서 사용할 상태
// dispatch: 액션을 발생시키는 함수

// useReducer vs useState?
// useState: 컴포넌트에서 관리하는 단순한 값 (숫자, 문자열, boolean ...)
// useReducer: 컴포넌트에서 관리하는 값이 여러개가 되어서 복잡한 구조의 상태
