import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "./css/register.css";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
import { loginValidator } from "./validator";
import { userContext } from "./UserContext";
import mentor_icon from "./images/icons/mentor_icon.svg";
import student_icon from "./images/icons/student_icon.svg";

const base_url = process.env.REACT_APP_BASE_URL;

function Login({ close_register, open_signup, registerCategory }) {
  console.log("opened login in category:" + registerCategory);

  const history = useHistory();
  const [userData, dispatch] = useContext(userContext);

  // state variable for student credentials
  const [studentCred, setstudentCred] = useState({
    email: "",
    password: "",
  });

  // state variable for mentor credentials
  const [mentorCred, setmentorCred] = useState({
    email: "",
    password: "",
  });

  console.log(registerCategory);
  const [category, setcategory] = useState(registerCategory);
  const oppositeCategory = category === "student" ? "mentor" : "student";
  console.log(category, oppositeCategory);
  // Sending credentials to server through axios
  const loginUser = (e) => {
    e.preventDefault();

    if (category === "student") {
      const url = base_url + "/user/login";
      const data = {
        email: studentCred.email,
        password: studentCred.password,
      };
      console.log(data);

      //validating the submitting data
      if (!loginValidator(data)) {
        return;
      }

      axios
        .post(url, data)
        .then((res) => {
          // store response returned from server related to user in the context
          const { jwtToken, ...user_info } = res.data;
          user_info.profile = base_url + user_info.profile;
          console.log(jwtToken);
          console.log(user_info);
          sessionStorage.setItem("jwtToken", jwtToken);
          sessionStorage.setItem("usertype", "student");

          // storing data in react context api
          dispatch({
            type: "ADD_USER",
            data: {
              category: "student",
              userInfo: user_info,
            },
          });
          console.log(userData);
          console.log("redirecting to studentpage");
          history.push("/studentpage");
        })
        .catch((err) => {
          console.log(err.response);
          alert(err.response.data.message);
        });
    } else {
      const url = base_url + "/mentor/login";
      const data = {
        email: mentorCred.email,
        password: mentorCred.password,
      };
      console.log(data);

      //validating the submitting data
      if (!loginValidator(data)) {
        return;
      }

      axios
        .post(url, data)
        .then((res) => {
          console.log(res);
          const { jwtToken, ...user_info } = res.data;
          user_info.profile = base_url + user_info.profile;
          console.log(jwtToken);
          console.log(user_info);
          sessionStorage.setItem("jwtToken", jwtToken);
          sessionStorage.setItem("usertype", "mentor");

          // storing data in react context api
          dispatch({
            type: "ADD_USER",
            data: {
              category: "mentor",
              userInfo: user_info,
            },
          });
          history.push("/mentorpage");
        })
        .catch((err) => {
          console.log(err.response);
          alert(err.response.data.message);
        });
    }
  };

  // Handling changes for each input part, storing it in state variable
  const changeHandler = (event) => {
    console.log("some changes occured in input field");
    if (category === "student") {
      const cred = { ...studentCred };
      const field = event.target.name;
      const value = event.target.value;
      cred[field] = value;
      setstudentCred(cred);
      console.log(studentCred);
    } else {
      const cred = { ...mentorCred };
      const field = event.target.name;
      const value = event.target.value;
      cred[field] = value;
      setmentorCred(cred);
      console.log(mentorCred);
    }
  };

  const pwdShowHide = (event) => {
    console.log("checkbox clicked");
    console.log(event.target.checked);
    if (event.target.checked) {
      document.querySelector(".register__password").type = "text";
    } else {
      document.querySelector(".register__password").type = "password";
    }
  };

  return (
    <div className="register">
      <div className="  registerSection">
        {/* this is for purple circle in background */}
        <div className="purple_circle"></div>
        {/* ================================================= */}
        <div className="cross" onClick={close_register}>
          <i class="fa fa-times" aria-hidden="true"></i>
          {/* &#x274C; */}
        </div>
        <div className="register__heading">
          <h1>SIGN IN</h1>
        </div>

        <div className="register__formContainer">
          <form className="register__form" onSubmit={loginUser}>
            <label for="email">Enter Email</label>
            <input
              type="email"
              minLength="6"
              name="email"
              placeholder="Enter Email"
              className="register__email"
              onChange={changeHandler}
              value={
                category === "student" ? studentCred.email : mentorCred.email
              }
              required
            />
            <span className="email__error error"></span>

            <label for="password">Password</label>
            <input
              type="password"
              minLength="8"
              name="password"
              placeholder="Password"
              className="register__password"
              onChange={changeHandler}
              value={
                category === "student"
                  ? studentCred.password
                  : mentorCred.password
              }
              required
            />
            <span className="password__error error"></span>

            <div className="pwdCheckbox">
              <input
                type="checkbox"
                name="pwdCheck"
                value={true}
                onClick={pwdShowHide}
                id="pwdCheck"
                className="pwdCheck"
              />
              <label for="pwdCheck">Show password</label>
            </div>

            <button type="submit" className="register__submit">
              SIGN IN
            </button>
          </form>
          <h5 className="sign__alternate">
            Create a new account?{" "}
            <span
              className="sign__alternateAnch"
              onClick={() => {
                open_signup(category);
              }}
            >
              Sign up
            </span>
          </h5>
          <hr />
          <h4 className="or">OR</h4>
          <div
            className="mentorBtn"
            onClick={() => setcategory(oppositeCategory)}
          >
            <div className="user_icon">
              <img
                src={oppositeCategory === "mentor" ? mentor_icon : student_icon}
                alt=""
              />
            </div>
            Sign in as&nbsp;{oppositeCategory}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
