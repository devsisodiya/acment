import React from "react";
import "./css/UserInfoUpdater.css";
import "font-awesome/css/font-awesome.min.css";
import { mentorSignup_validator, studentSignup_validator } from "./validator";
import axios from "axios";
import UserContextProvider from "./UserContext";

const baseUrl = process.env.REACT_APP_BASE_URL;

function UserInfoUpdater({ closeUpdateInfo }) {
  const [userData, dispatch] = UserContextProvider();
  const userInfo = userData.userInfo;

  const updateUser = (e) => {
    e.preventDefault();
    console.log("updating data");
    const updatedData = {
      username: e.target.username.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      exam: e.target.exam.value,
    };
    userData.category === "student"
      ? (updatedData.parent_phone = e.target.parentPhone.value)
      : (updatedData.subject = e.target.subject.value);

    const validated =
      userData.category === "student"
        ? studentSignup_validator(updatedData, false) //Here false is given for mentioning not requiring password in validator
        : mentorSignup_validator(updatedData, false);
    console.log("validated:", validated);
    if (!validated) return;

    const jwt = sessionStorage.getItem("jwtToken");
    const category = userData.category;
    const updateUrl = baseUrl + (category === "student" ? "/user" : "/mentor");
    console.log(updateUrl);
    console.log(updatedData);
    axios
      .patch(updateUrl, updatedData, {
        headers: {
          authorization: "Bearer " + jwt,
        },
      })
      .then((res) => {
        res.data.profile = baseUrl + res.data.profile;
        console.log(res);
        dispatch({
          type: "ADD_USER_INFO",
          data: res.data,
        });
        closeUpdateInfo();
      });
  };
  return (
    <div className="userInfoUpdater">
      <div className="userInfoUpdater__container">
        {/* this is for purple circle in background */}
        <div className="purple__circle"></div>
        {/* ================================================= */}
        <div className="cross" onClick={closeUpdateInfo}>
          <i class="fa fa-times" aria-hidden="true"></i>
        </div>
        <div className="userInfoUpdater__heading">
          <h1>Update Profile</h1>
        </div>
        <div className="userInfoUpdater__formContainer">
          <form className="userInfoUpdater__form" onSubmit={updateUser}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              defaultValue={userInfo.username}
            />
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              defaultValue={userInfo.email}
            />
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              defaultValue={userInfo.phone}
            />
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              defaultValue={userInfo.address}
            />
            {userData.category === "student" ? (
              <div>
                <label htmlFor="parentPhone">Parent Phone</label>
                <input
                  type="text"
                  id="parentPhone"
                  name="parentPhone"
                  defaultValue={userInfo.parent_phone}
                />
              </div>
            ) : (
              <div>
                <label htmlFor="subject">Subject</label>
                <select
                  name="subject"
                  defaultValue={userInfo.mentor__subject}
                  id="subject"
                  placeholder="subject"
                  required
                >
                  <option value="physics">Physics</option>
                  <option value="chemistry">Chemistry</option>
                  {userInfo.exam === "JEE" ? (
                    <option value="maths">Maths</option>
                  ) : (
                    <option value="biology">Biology</option>
                  )}
                </select>
              </div>
            )}

            {/* exam */}
            <label htmlFor="exam">Exam</label>
            <select
              name="exam"
              id="exam"
              placeholder="Exam"
              defaultValue={userInfo.exam}
              required
            >
              <option value={userInfo.exam} selected>
                {userInfo.exam}
              </option>
              <option value={userInfo.exam === "JEE" ? "NEET" : "JEE"}>
                {userInfo.exam === "JEE" ? "NEET" : "JEE"}
              </option>
            </select>

            <button type="submit" className="register__submit">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserInfoUpdater;
