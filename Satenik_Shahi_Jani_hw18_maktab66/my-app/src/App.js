import "./App.css";
import WithLoginHOC from "./withLogin";
import React from "react";
import UsersContextProvider from "./Context/UsersContext";
import AuthentProvider from "./Context/AuthentContext";
import Tabs from "./Components/Tabs";

function App({ user, setUser, ...props }) {
  const handleLogOut = () => {
    setUser(false);
  };
  return (
    <>
    {/* <Tabs/> */}
      <h1>Hello {user.fname}</h1>
      <button onClick={() => handleLogOut}>LOG OUT</button>
    </>
  );
}

// export default (App);
export default WithLoginHOC(App);
