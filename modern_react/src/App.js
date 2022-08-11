import { useRef } from "react";
import InputSample from "./inputSample";
import UserList from "./userList";

function App() {
  const users = [
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
  ];

  const nextId = useRef(4);
  // useRef 훅은 특정 DOM을 선택하는 용도 뿐만 아니라
  // 컴포넌트 안에서 조회 및 수정 할 수 있는 변수를 관리하는 데에도 사용됨
  // userRef로 관리하는 변수는 값이 바뀌어도 컴포넌트가 리렌더링되지 않는다
  // ** 컴포넌트 상태는 상태를 바꾸는 함수를 호출하고 나서 다음 렌더링 이후에서야 업데이트된 상태를 조회할 수 있다
  // 이 값을 수정할 때에는 .current 값을 수정, 조회할 때에도 .current값을 조회

  // *** useRef 보충 ***
  // useRef는 일반적인 JS 객체 => heap 영역에 저장된다
  // 그래서 어플리케이션이 종료되거나 가비지 컬렉팅 될 때까지
  // 참조할 때마다 같은 메모리 주소를 가진다
  // 따라서 '===' 연산이 항상 true를 반환하고 값이 바뀌어도 내부 값이 바뀌어도 리렌더링 되지 않는다

  // 그러면 useRef 사용없이 current값을 객체로 감싸면은 '==='연산이 항상 true를 반환해서
  // const nextId = {current: 4} 와 같이 사용할 수 없냐고 할 수 도 있다
  // 하지만 함수형 컴포넌트는 호출될 때마다 함수 내부에 정의된 로컬 변수들을 초기화하기 때문에
  // nextId.current는 업데이트가 되지 않고 호출될 때마다 항상 4이다

  const onCreate = () => {
    // 나중에 구현할 배열에 항목 추가 로직
    // ...

    nextId.current += 1;
  };

  return <UserList users={users} />;
}

export default App;
