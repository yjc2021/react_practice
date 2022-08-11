import React from "react";

const User = ({ user }) => {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
};

const UserList = () => {
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
  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
};

// 동적인 배열을 렌더링해야 할 때에는 JS 배열의 내장함수 map()을 사용
// 리액트에서 배열을 렌더링 할 때에는 key라는 props를 설정 (고유값)
// 고유 원소에 key가 있어야만 배열이 업데이트될 때 효율적으로 렌더링
// 수정되지 않는 기존 값은 그대로 두고 원하는 위치에 내용을 삽입하거나 삭제할 수 있다

// 만약 key값이 없다면 중간의 값이 바뀌었을 때
// 그 하위 값들이 전부 업데이트되어 리렌더링 되기 때문에 비효율적이다
export default UserList;
