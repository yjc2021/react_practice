import { useRef, useState } from "react";
import InputSample from "./inputSample";
import UserList from "./userList";
import CreateUser from "./createUser";
function App() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });
  const { username, email } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
    },
  ]);

  const nextId = useRef(4);

  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    setUsers([...users, user]);
    //setUsers(users.concat(user));
    setInputs({
      username: "",
      email: "",
    });
    nextId.current += 1;
  };

  const onRemove = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };
  // 배열 state에서 요소를 제거할 때 JS 내장 함수 filter()를 사용
  // filter()의 ()안의 조건이 true인 요소로만 구성된 새 배열을 반환
  // 배열 state의 불변성을 유지하기 위함이다
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} />
    </>
  );
}

export default App;

// 불변성을 지키면서 배열 state에 새 항목을 추가하는 방법
// 1. spread (...) 연산자 사용: (...배열이름)
// 2. concat 함수를 사용: (배열이름.concat(합치고 싶은 배열))
