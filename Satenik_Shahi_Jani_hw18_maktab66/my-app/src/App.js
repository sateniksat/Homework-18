import "./App.css";
import WithLoginHOC from "./withLogin";
import React from "react";
// import UsersContextProvider from "./Context/UsersContext";
// import AuthentProvider from "./Context/AuthentContext";
// import Tabs from "./Components/Tabs";

function App({ user, setUser, ...props }) {
  return (
    <div className="App">
      {/* <Tabs/> */}
      <h1>Hello <span>{user.fname}</span> !!!</h1>
      <button onClick={(e) => setUser(false)}>Log Out</button>
    </div>
  );
}

// export default (App);
export default WithLoginHOC(App);
