import React, { useEffect } from "react";

const User = ({ user, onRemove, onToggle }) => {
  useEffect(() => {
    console.log("컴포넌트가 화면에 나타남");
    return () => {
      console.log("컴포넌트가 화면에서 사라짐");
    };
  }, []);

  // useEffect의 첫번째 파라미터: 함수
  // useEffect의 두번째 파라미터: 의존값이 들어있는 배열 (deps)
  // deps를 비우게 되면 컴포넌트가 처음 나타날 떄 (마운트)에만 useEffect에 등록된 함수가 호출

  // cleanup 함수: useEffect에서 반환하는 함수
  // useEffect에 대한 '뒷정리'를 해준다고 이해
  // deps가 비어있는 경우에 컴포넌트가 사라질 떄 (언마운트) cleanup 함수 호출

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
