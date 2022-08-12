import React, { useMemo, useReducer } from "react";
import UserList from "./userList";
import CreateUser from "./createUser";

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

export const UserDispatch = React.createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { users } = state;

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser />
      <UserList users={users} />
      <div>활성사용자 수: {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;

// Context API: 프로젝트 안에서 전역적으로 사용할 수 있는 값을 관리
// '값': 상태, 함수, 외부 라이브러리 인스턴스, DOM ...

// const UserDispatch = React.createContext(null);
// <UserDispatch.Provider value={dispatch}>...</UserDispatch.Provider>
// Context 안에 Provider 컴포넌트를 통하여 Context의 값을 정하고
// 전역적으로 사용할 겂을 value로 지정한다
// Provider에 의하여 감싸여진 컴포넌트 중 어디서든지 Context의 값 바로 조회 가능

// useReducer의 dispatch를 Context API를 사용해서 전역적으로 사용
// 여러 자식 컴포넌트를 거쳐 컴포넌트에게 함수를 전달해줘야 하는 상황에서
// 코드의 구조가 훨씬 깔끔해짐
