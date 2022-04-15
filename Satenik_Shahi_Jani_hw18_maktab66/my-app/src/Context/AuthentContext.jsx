import React, { useState, createContext, useEffect } from "react";

export const AuthentContext = createContext();

export const AuthentProvider = ({ children }) => {

  const [items, setdataFetch] = useState([]);

  const [checked, setChecked] = useState([]);

  useEffect(() => {
    axios
      .get("/json/iranstates.json")
      .then((res) => {
        const dataJson = res.data;
        setdatafetch(dataJson);
      })
      .catch((error) => alert(error));
  }, []);

  return (
    <AuthentContext.Provider value={{ items, checkItem, checked }}>
      {children}
    </AuthentContext.Provider>
  );
};
export default AuthentProvider;