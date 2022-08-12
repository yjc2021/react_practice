import { useCallback, useMemo, useRef, useState } from "react";
import UserList from "./userList";
import CreateUser from "./createUser";

const countActiveUsers = (users) => {
  console.log("활성 사용자 수를 세는 중...");
  return users.filter((user) => user.active).length;
};
function App() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });
  const { username, email } = inputs;
  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value,
      });
    },
    [inputs]
  );

  const [users, setUsers] = useState([
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
  ]);

  const nextId = useRef(4);

  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email,
      active: false,
    };
    setUsers([...users, user]);
    //setUsers(users.concat(user));
    setInputs({
      username: "",
      email: "",
    });
    nextId.current += 1;
  }, [users, username, email]);

  const onRemove = useCallback(
    (id) => {
      setUsers(users.filter((user) => user.id !== id));
    },
    [users]
  );

  const onToggle = useCallback(
    (id) => {
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, active: !user.active } : user
        )
      );
    },
    [users]
  );

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성사용자 수: {count}</div>
    </>
  );
}

export default App;

// useCallback: 특정 함수 재사용
// ** useMemo: 특정 결과값 재사용

// 컴포넌트에서 props가 바뀌지 않으면 Virtual DOM에 새로 렌더링하는 것 조차 하지 않고
// 컴포넌트 자체를 재사용하는 최적화 작업을 하려면
// *** 함수 재사용이 필수 ***
// deps안에 함수에서 사용한느 상태, props를 무조건 포함
// React.memo를 통한 컴포넌트 렌더링 최적화 작업을 위해
// 함수 재사용 (useCallback) 필수
