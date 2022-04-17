import React, { useEffect, useState, memo } from "react";
// import{useContext } from "react";
import { Formik } from "formik";
import axios from "axios";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
// import { UsersContext } from "../Context/UsersContext";


const SignUp = () => {
  const [visiblity, setvisibility] = useState(false);
  const [data, setdata] = useState({});
  const [city, setcity] = useState([]);

  // const {usersdata } = useContext(UsersContext);

  const initialValues = {
    email: "",
    password: "",
    fname: "",
    lname: "",
    edu: "",
    edulocation: "",
    state: "",
    city: "",
  };
  
  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "لطفا فیلد Email را پر کنید.";
    } else if (!regex.test(values.email)) {
      errors.email = "Email  صحیح نیست";
    }
    if (!values.password) {
      errors.password = "لطفا فیلد Password را پر کنید.";
    } else if (values.password.length < 6) {
      errors.password = "کلمه عبور کوتاه است -باید حداقل ۶ کاراکتر داشته باشد.";
    }
    if (!values.fname) {
      errors.fname = "لطفا فیلد  را پر کنید.";
    } else if (values.fname.length < 1) {
      errors.fname = "باید حداقل 1 کاراکتر داشته باشد.";
    }
    if (!values.lname) {
      errors.lname = "لطفا فیلد  را پر کنید.";
    } else if (values.lname.length < 1) {
      errors.lname = "باید حداقل 1 کاراکتر داشته باشد.";
    }
    if (values.edu !== "") {
      if (!values.edulocation) {
        errors.edulocation = "لطفا فیلد  را پر کنید.";
      }
    }
    if (!values.state) {
      errors.state = "لطفا فیلد  را پر کنید.";
    }
    if (!values.city) {
      errors.city = "لطفا فیلد  را پر کنید.";
    }
    return errors;
  };
  const submitForm = (values) => {
    console.log(values);
    axios.post(" http://localhost:3002/users", values);
  };
  // const checkEmail=(values)=>{
  //   usersdata.map(item => {
  //     if (item.email === values.email ) {       
  //       return alert("این ایمیل قبلاْ استفاده شده است.")
  //     }else{
  //     return true;
  //     }
  //     // return true;
  //   })
  // }
  const checkFields=(values)=>{

    if (
      values.edu !== "" &&
      values.edulocation !== "" &&
      values.fname !== "" &&
      values.password !== "" &&
      values.lname !== "" &&
      values.email !== "" &&
      values.state !== "" &&
      values.city !== ""
    ) {
     return true;
    } else if (
      values.fname !== "" &&
      values.password !== "" &&
      values.lname !== "" &&
      values.email !== "" &&
      values.state !== "" &&
      values.city !== "" &&
      values.edu === "" &&
      values.edulocation === ""
    ) {
     return true;
    }else{
      return false;
    }
  }
  // const submitone = (values, { setSubmitting }) => {
  //   setTimeout(() => {
  //     alert(JSON.stringify(values, null, 2));
  //     setSubmitting(false);
  //   }, 1000);
  // };
  
  function getcity(event) {
    setcity([]);
    const select = event.target.value;
    if (select === 0) {
      return setcity([]);
    } else {
      Object.keys(data).map((item) => {
        if (item === select) {
          return setcity(data[item]);
        }
        return true;
      });
    }
  }

  useEffect(() => {
    axios
      .get("/json/iranstates.json")
      .then((res) => {
        const dataJson = res.data;
        setdata(dataJson);
      })
      .catch((error) => alert(error));
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={submitForm}
    >
      {(formik) => {
        const {
          values,
          handleChange,
          handleSubmit,
          resetForm,
          errors,
          // touched,
          // handleBlur,
          // isValid,
          // dirty,
        } = formik;

        return (
          <form
            className="signup-container"
            onSubmit={(e) => {
              e.preventDefault();
              // && checkEmail(values)
              if(checkFields(values) ){
                handleSubmit(e);
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  resetForm();
                }, 1000);
              }else{
                alert("فرم را کامل پر کنید.")
              }
            }}
          >
            <h2>رایگان ثبت نام کنید</h2>
            <div className="container--inside">
              <div className="contain-1">
                <label>نام</label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="fname"
                  value={values.fname}
                  placeholder="&#8226; نام"
                />
                <p className="warning">{errors.fname ? errors.fname : null}</p>
              </div>
              <div className="contain-1">
                <label>نام خانوادگی</label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="lname"
                  value={values.lname}
                  placeholder="&#8226; نام خانوادگی"
                />
                <p className="warning">{errors.lname ? errors.lname : null}</p>
              </div>
            </div>
            <div className="container--inside">
              <div className="contain-1">
                <label>میزان تحصیلات</label>
                <select
                  onClick={() => (values.edulocation = "")}
                  value={values.edu}
                  onChange={handleChange}
                  name="edu"
                >
                  <option value="">&#8226;میزان تحصیلات</option>
                  <option value="Degree">سیکل</option>
                  <option value="Diploma">دیپلم</option>
                  <option value="Adegree">فوق دیپلم</option>
                  <option value="Bachelor">لیسانس</option>
                  <option value="MA">فوق لیسانس</option>
                  <option value="Doctorate">دکترا</option>
                </select>
              </div>
              {values.edu !== "" && (
                <div className="contain-1">
                  <label>محل تحصیل </label>
                  <input
                    onChange={handleChange}
                    name="edulocation"
                    type="text"
                    value={values.edulocation}
                    placeholder="&#8226;محل تحصیل"
                  />
                  <p className="warning">
                    {errors.edulocation ? errors.edulocation : null}
                  </p>
                </div>
              )}
            </div>
            <div className="container--inside">
              <div className="contain-1">
                <label>استان</label>
                <select
                  onChange={handleChange}
                  value={values.state}
                  onClick={(event) => getcity(event)}
                  name="state"
                >
                  <option>&#8226; استان محل تولد</option>
                  {Object.keys(data)?.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <p className="warning">{errors.state ? errors.state : null}</p>
              </div>
              <div className="contain-1">
                <label>محل تولد</label>
                <select name="city" value={values.city} onChange={handleChange}>
                  <option>&#8226;شهر محل تولد</option>
                  {city.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <p className="warning">{errors.city ? errors.city : null}</p>
              </div>
            </div>
            <label className="username-login">پست الکترونیک</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              value={values.email}
              placeholder="&#8226; پست الکترونیک"
            />
            <p className="warning">{errors.email ? errors.email : null}</p>
            <div className="login-pass">
              <label className="password-login">کلمه عبور</label>
              <input
                className="login-pass"
                name="password"
                type={visiblity ? "text" : "password"}
                value={values.password}
                onChange={handleChange}
                placeholder="&#8226; کلمه عبور"
              />
              <div
                className="pass-eye"
                onClick={() => setvisibility(!visiblity)}
              >
                {visiblity ? <IoMdEye /> : <IoMdEyeOff />}
              </div>
              <p className="warning">
                {errors.password ? errors.password : null}
              </p>
            </div>
            <button className="submit-login" type="submit">
              ثبت نام
            </button>
          </form>
        );
      }}
    </Formik>
  );
};
export default memo(SignUp);
