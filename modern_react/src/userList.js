import React, { useEffect } from "react";

const User = ({ user, onRemove, onToggle }) => {
  useEffect(() => {
    console.log("user 값이 설정됨");
    console.log(user);
    return () => {
      console.log("user가 바뀌기 전..");
      console.log(user);
    };
  }, [user]);

  // deps에 특정 의존값을 넣게 되면
  // 컴포넌트가 처음 마운트될 때, 컴포넌트 값이 바뀔 때
  // useEffect 첫번째 파라미터 함수가 호출된다

  // 컴포넌트가 언마운트될 때, 컴포넌트 값이 바뀌기 직전에
  // useEffect 반환 함수가 호출된다

  // 의존값이 바뀔 때 호출 순서
  // 이전 state 기준 return 함수 호출
  // -> 새 state 기준 useEffect 첫번째 파라미터 함수 호출

  // useEffect 안에서 사용하는 상태 및 props는 무조건 deps에 넣어줘야 한다
  // 원활한 props/상태 update을 위해
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
