import React, { useState } from "react";
import User from "./User";
import { useUsersDispatch, useUsersState, getUsers } from "./UsersContext";

const Users = () => {
  const [userId, setUserId] = useState(null);
  const state = useUsersState();
  const dispatch = useUsersDispatch();

  const { data: users, loading, error } = state.users;
  const fetchData = () => {
    getUsers(dispatch);
  };

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return <button onClick={fetchData}>불러오기</button>;
  return (
    <>
      <ul>
        {users.map((user) => (
          <li
            style={{ cursor: "pointer" }}
            key={user.id}
            onClick={() => setUserId(user.id)}
          >
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchData}>다시 불러오기</button>
      {userId && <User id={userId} />}
    </>
  );
};

export default Users;

// API 요청에 대한 상태를 관리할 때에는 총 3가지 상태를 관리해야 한다
// 1. 요청의 결과
// 2. 로딩 상태
// 3. 에러
// useReducer로 요청 상태를 관리, useEffect로 컴포넌트 렌더링 시점에 요청을 시작

// ** useEffect에 첫번째 파라미터로 등록하는 함수에는 async를 사용할 수 없기 때문에
// 함수 내부에서 async를 사용하는 새로운 함수를 선언해줘야 함
