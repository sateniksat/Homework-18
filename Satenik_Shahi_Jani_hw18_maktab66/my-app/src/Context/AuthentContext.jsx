import React, { useState, createContext } from "react";

export const AuthentContext = createContext();

export const AuthentProvider = ({ children }) => {

  const [user, setUser] = useState(false);

  return (
    <AuthentContext.Provider value={{user,setUser}}>
      {children}
    </AuthentContext.Provider>
  );
};
export default AuthentProvider;