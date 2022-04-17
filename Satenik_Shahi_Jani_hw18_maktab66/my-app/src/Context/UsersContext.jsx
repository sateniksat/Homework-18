import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
export const UsersContext = createContext();

export const UsersContextProvider = ({ children }) => {
  const [usersdata, setusersdata] = useState([]);
  function handlelogin(input) {
    setusersdata(input);
  }
  useEffect(() => {
    axios
      .get(" http://localhost:3002/users")
      .then((res) => {
        // console.log(res);
        setusersdata(res.data);
      })
      .catch((error) => alert(error));
  }, []);

  return (
    <UsersContext.Provider value={{ usersdata, handlelogin }}>
      {children}
    </UsersContext.Provider>
  );
};
export default UsersContextProvider;
