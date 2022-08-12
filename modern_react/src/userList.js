import React, { useEffect } from "react";

const User = ({ user, onRemove, onToggle }) => {
  useEffect(() => {
    console.log(user);
  });

  // deps를 생략한다면 컴포넌트가 리렌더링될 때마다 useEffect가 호출된다
  // ** 리액트 컴포넌트는 기본적으로 부코 컴포넌트가 리렌더링되면 자식 컴포넌트도 리렌더링된다(자식 컴포넌트 값이 바뀌지 않았더라도)
  // 실제 DOM에 변화가 반영되는 곳은 바뀐 내용이 있는 컴포넌트이지만
  // VirtualDOM에는 모든 걸 다시 렌더링하고 있어 리소스 낭비
  return (
    <div>
      <b
        style={{
          cursor: "pointer",
          color: user.active ? "green" : "black",
        }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
};

const UserList = ({ users, onRemove, onToggle }) => {
  return (
    <div>
      {users.map((user) => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default UserList;
