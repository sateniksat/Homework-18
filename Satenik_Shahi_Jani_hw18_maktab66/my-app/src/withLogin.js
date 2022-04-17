import React, { useContext } from 'react'
import Tabs from './Components/Tabs';
import { AuthentContext } from './Context/AuthentContext';

const WithLoginHOC = (Component) => {
  return function WithLogin(props) {
    const {user,setUser}=useContext(AuthentContext);
   return (
     <>
     {user===false ? <Tabs/> :  <Component user={user} setUser={setUser} {...props} />}
     </>
    );
  };
};
export default WithLoginHOC;