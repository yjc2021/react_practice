import React from "react";
import Users from "./Users";
import { UsersProvider } from "./UsersContext";

const App2 = (props) => {
  return (
    <UsersProvider>
      <Users />
    </UsersProvider>
  );
};

export default App2;
