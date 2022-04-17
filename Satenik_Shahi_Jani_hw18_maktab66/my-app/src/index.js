import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthentProvider from "./Context/AuthentContext";
import UsersContextProvider from "./Context/UsersContext";

ReactDOM.render(
  <UsersContextProvider>
    <AuthentProvider>
      <App />
    </AuthentProvider>
  </UsersContextProvider>,
  document.getElementById("root")
);
