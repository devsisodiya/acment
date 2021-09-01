import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./css/register.css";
import "font-awesome/css/font-awesome.min.css";
import StudentSignup from "./StudentSignup";
import MentorSignup from "./MentorSignup";
import { studentSignup_validator } from "./validator";
import { mentorSignup_validator } from "./validator";

import axios from "axios";
import mentor_icon from "./images/icons/mentor_icon.svg";
import student_icon from "./images/icons/student_icon.svg";

console.log(process.env.REACT_APP_BASE_URL);

function Signup({ close_register, open_login, registerCategory }) {
  const history = useHistory();

  console.log("opened signup in category:" + registerCategory);
  // To store whether the user is mentor or student
  const [category, setcategory] = useState(registerCategory);
  // Sending data to server
  const signupUser = (e) => {
    e.preventDefault();
    console.log("submitting data...");

    if (category === "student") {
      console.log("submitting student data");
      const data = {
        username: studentData.username,
        email: studentData.email,
        phone: studentData.phone,
        parent_phone: studentData.parent_phone,
        address: studentData.student__address,
        password: studentData.password,
        exam: studentData.student__exam,
      };
      console.log(data);
      // validating the submitting data of student
      if (!studentSignup_validator(data)) {
        return;
      }

      const url = process.env.REACT_APP_BASE_URL + "/user/register";
      axios
        .post(url, data)
        .then((res) => {
          console.log(res);
          open_login();
          // history.push("/studentpage");
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
          alert(err.response.data.message);
        });
    } else {
      console.log("submitting mentor data");
      const data = {
        username: mentorData.username,
        email: mentorData.email,
        phone: mentorData.mentor__phone,
        address: mentorData.mentor__address,
        password: mentorData.password,
        exam: mentorData.mentor__exam,
        subject: mentorData.mentor__subject,
      };
      console.log(data);
      // validating the submitting data of mentor
      if (!mentorSignup_validator(data)) {
        return;
      }

      const url = process.env.REACT_APP_BASE_URL + "/mentor/register";
      axios
        .post(url, data)
        .then((res) => {
          console.log(res);
          open_login();
          // history.push("/mentorpage");
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
          alert(err.response.data.message);
        });
    }
  };

  // to store the student data if the user is student
  const [studentData, setstudentData] = useState({
    username: "",
    email: "",
    phone: "",
    parent_phone: "",
    student__address: "",
    student__exam: "JEE",
    password: "",
  });

  // to store the mentor data if the user is mentor
  const [mentorData, setmentorData] = useState({
    username: "",
    email: "",
    mentor__phone: "",
    mentor__address: "",
    mentor__exam: "JEE",
    mentor__subject: "physics",
    password: "",
  });

  // If user is student, then oppositeCategory="mentor" :
  // This is used to display alternate signup option for mentor
  const oppositeCategory = category === "student" ? "mentor" : "student";
  console.log(category, oppositeCategory);

  // console.log(studentData);
  // console.log(mentorData);

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
      <div className="registerSection">
        {/* this is for purple circle in background */}
        <div className="purple_circle"></div>
        {/* ================================================= */}
        <div className="cross" onClick={close_register}>
          <i class="fa fa-times" aria-hidden="true"></i>
          {/* &#x274C; */}
        </div>
        <div className="register__heading">
          <h1>SIGN UP</h1>
        </div>{" "}
        <div className="register__formContainer">
          <form className="register__form">
            {" "}
            {category === "student" ? (
              <StudentSignup
                setStudent={setstudentData}
                studentData={studentData}
              />
            ) : (
              <MentorSignup setMentor={setmentorData} mentorData={mentorData} />
            )}{" "}
            <div className="pwdCheckbox">
              <input
                type="checkbox"
                name="pwdCheck"
                value={true}
                onClick={pwdShowHide}
                id="pwdCheck"
                className="pwdCheck"
              />
              <label for="pwdCheck"> Show password </label>{" "}
            </div>{" "}
            <button
              type="submit"
              onClick={signupUser}
              className="register__submit"
            >
              SIGN UP{" "}
            </button>{" "}
          </form>{" "}
          <h5 className="sign__alternate">
            Already have an account ?{" "}
            <span
              className="sign__alternateAnch"
              onClick={() => {
                open_login(category);
              }}
            >
              Log In{" "}
            </span>{" "}
          </h5>{" "}
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
            Sign up as&nbsp;{oppositeCategory}
          </div>
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default Signup;
