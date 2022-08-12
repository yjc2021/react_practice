import React, { useEffect } from "react";

const User = React.memo(({ user, onRemove, onToggle }) => {
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
});

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

export default React.memo(UserList);

// React.memo 함수: 필요한 상황에서만(props가 변했을 떄만) 컴포넌트가 리렌더링 하도록 설정
// (컴포넌트의 props가 바뀌지 않았다면 리렌더링 방지)
// state의 setter 함수에서 함수형 업데이트를 하면 최신 상태를 참조하기 때문에
// useCallback의 deps에 state을 넣지 않아도 되어 불필요한 렌더링을 방지
