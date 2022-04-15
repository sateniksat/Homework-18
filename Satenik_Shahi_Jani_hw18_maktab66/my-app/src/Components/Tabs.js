import { useState,memo } from "react";
import "../App.css";
import LogIn from "./LogIn1";
import SignUp from "./SignUp1";

function Tabs() {
  const [toggleState, setToggleState] = useState(2);
 const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <div className="container-0">
      <div className="container">
        <div className="bloc-tabs">
          <button
            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            ثبت نام
          </button>
          <button
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            ورود
          </button>
        </div>

        <div className="content-tabs">
          <div
            className={
              toggleState === 1 ? "content  active-content" : "content"
            }
          ><SignUp/>
          </div>

          <div
            className={
              toggleState === 2 ? "content  active-content" : "content"
            }
          >
            <LogIn/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Tabs);
