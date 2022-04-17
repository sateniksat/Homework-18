import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, memo } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { UsersContext } from "../Context/UsersContext";
import { AuthentContext } from "../Context/AuthentContext";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Email  صحیح نیست")
    .required("لطفا فیلد Email را پر کنید."),
  password: Yup.string()
    .min(6, "کلمه عبور کوتاه است -باید حداقل ۶ کاراکتر داشته باشد.")
    .required("لطفا فیلد Password را پر کنید."),
});

function LogIn() {
  const [visiblity, setvisibility] = useState(false);
  const {usersdata, handlelogin } = useContext(UsersContext);
  const {user,setUser}=useContext(AuthentContext);
  console.log(usersdata);

  const { handleSubmit, handleChange, values, errors} = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit(values,{resetForm}) {
      usersdata.map(item => {
        // setUser(false);
        if (item.email === values.email && item.password === values.password) {       
          setUser(item)
          return;
        }
      })
      alert(JSON.stringify(user, null, 2));
      console.log(values);
      console.log(user);
      resetForm();
    }
  });

  return (
    <form className="login-container" onSubmit={(e) => { e.preventDefault(); handleSubmit(e)}} >
      <h2>خوش آمدید</h2>
      <label className="username-login">پست الکترونیک</label>
      <input
        type="email"
        name="email"
        onChange={handleChange}
        value={values.email}
        placeholder="&#8226; پست الکترونیک"
      />
      <p className="warning">{errors.email ? errors.email : null}</p>
      {/* <button
        onClick={() => {
          console.log(values);
          console.log(handleChange);
        }}
      >
        click
      </button> */}
      <div className="login-pass">
        <label className="password-login">کلمه عبور</label>
        <input
          className="login-pass"
          name="password"
          type={visiblity ? "text" : "password"}
          onChange={handleChange}
          value={values.password}
          placeholder="&#8226; کلمه عبور"
        />
        <div className="pass-eye" onClick={() => setvisibility(!visiblity)}>
          {visiblity ? <IoMdEye /> : <IoMdEyeOff />}
        </div>
        <p className="warning">{errors.password ? errors.password : null}</p>
      </div>
      <div className="forgot-pass">فراموش کردید؟</div>
      <button className="submit-login" type="submit">
        ورود
      </button>
    </form>
  );
}

export default LogIn;
