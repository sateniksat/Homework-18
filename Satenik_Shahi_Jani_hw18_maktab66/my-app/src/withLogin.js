import React, { useContext } from 'react'
import Tabs from './Components/Tabs';
import { AuthentContext } from './Context/AuthentContext';

const WithLoginHOC = (Component) => {
  const {user,setUser}=useContext(AuthentContext);
  return function withLogin(props) {

    return (
      <Component user={user} setUser={setUser} {...props} />
    );
  };
};
export default WithLoginHOC;