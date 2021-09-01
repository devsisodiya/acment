import React, { useState } from "react";
import UserContextProvider from "./UserContext";
import alt_profile from "./images/icons/profile_alt_icon.svg";
import add_photo from "./images/icons/add_photo.svg";
import "./css/UserInfo.css";
import "font-awesome/css/font-awesome.min.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserInfoUpdater from "./UserInfoUpdater";

const baseUrl = process.env.REACT_APP_BASE_URL;
// const profileURL = baseUrl + "/user/profile";

function UserInfo() {
  const [userData, dispatch] = UserContextProvider();

  const history = useHistory();
  console.log(userData);
  const userInfo = userData.userInfo;

  const logout = () => {
    sessionStorage.clear();
    dispatch({
      type: "REMOVE_USER",
    });
    history.push("/");
  };

  console.log(userInfo);

  // to show and hide password updating form
  // const [pwdForm, setPwdForm] = useState(["", false]);
  const showHidePwdForm = () => {
    const pwdForm = document.querySelector(".userInfo__pwdForm");
    if (pwdForm.style.display === "none") {
      pwdForm.style.display = "block";
    } else {
      pwdForm.style.display = "none";
    }
  };

  // ========================= User Info update part  ======================================

  // To show the user info update  part
  const [userInfoUpdate, setUserInfoUpdate] = useState("");
  const openUpdateInfo = () => {
    const field = document.querySelector(".userInfo__updateInfo");
    field.style.display = "block";
    setUserInfoUpdate(
      <UserInfoUpdater closeUpdateInfo={closeUpdateInfo} userData={userData} />
    );
  };

  const closeUpdateInfo = () => {
    const field = document.querySelector(".userInfo__updateInfo");
    field.style.display = "none";
    setUserInfoUpdate("");
  };
  // ======================================================================================

  // ============================  Profile picture part ===========================================

  // to upload profile picture
  const profileUploader = (e) => {
    console.log("uploading image profile");
    //   Form data preparation part
    const file = e.target.files[0]; //this returns an array of files,we need only single one
    console.log(file);
    const formData = new FormData();
    formData.append("image", file);
    console.log(formData.get("image"));

    const jwt = sessionStorage.getItem("jwtToken");
    const category = userData.category;

    //  API URL part
    const profileURL =
      baseUrl + (category === "student" ? "/user/profile" : "/mentor/profile");
    console.log(profileURL);

    axios
      .post(profileURL, formData, {
        headers: {
          authorization: "Bearer " + jwt,
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: "ADD_USER_INFO",
          data: { profile: baseUrl + res.data.profile },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Profile pic declaring part
  const profile = userInfo.profile ? userInfo.profile : alt_profile;

  // =============================================================================================

  return (
    <div className="userInfo">
      <div className="userInfo__updateInfo">{userInfoUpdate}</div>
      <div className="userInfo__profile">
        <div className="userInfo__profilePic">
          <img src={profile} alt="" />
        </div>
        <label htmlFor="profilePicInput">
          <img src={add_photo} alt="" className="userInfo__addProfilePic" />
        </label>
        <input
          type="file"
          accept="image/*"
          name="profilePic"
          id="profilePicInput"
          onChange={profileUploader}
        />
      </div>
      <h2 className="userInfo__heading">Hello {userInfo.username}</h2>
      <div className="userInfo__details">
        <h3>Email : {userInfo.email}</h3>
        <h3>Phone : {userInfo.phone}</h3>
        {userData.category === "student" ? (
          <h3>Parent's Phone : {userInfo.parent_phone}</h3>
        ) : (
          ""
        )}
        <h3>Address : {userInfo.address}</h3>
        <h3>Exam : {userInfo.exam}</h3>
        {userData.category === "mentor" ? (
          <h3>Subject : {userInfo.subject}</h3>
        ) : (
          ""
        )}
      </div>
      <button className="userInfo__updateInfoBtn" onClick={openUpdateInfo}>
        Update Profile
      </button>
      <button className="userInfo__changePwdBtn" onClick={showHidePwdForm}>
        Change password
      </button>
      <div className="userInfo__pwdForm">
        <ChangePassword showHidePwdForm={showHidePwdForm} />
      </div>

      <button className="userInfo__logout" onClick={logout}>
        Log out
      </button>
    </div>
  );
}

export default UserInfo;

// Form for changing password
const ChangePassword = ({ showHidePwdForm }) => {
  console.log("message from password form");
  // handling update password request
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit request recieved");
    // console.log(e.target.currPwd.value);
    const currPwd = e.target.currPwd.value;
    const newPwd = e.target.newPwd.value;
    const renewPwd = e.target.renewPwd.value;

    // validating passwords
    if (newPwd !== renewPwd) {
      alert("Re-type the same password only");
      return;
    }
    if (newPwd === currPwd) {
      alert("Old and new passwords are same");
      return;
    }
    if (!passwordValidator(newPwd)) {
      return;
    }
    // creating data for submission
    const data = {
      currentPassword: currPwd,
      newPassword: newPwd,
    };
    const category = sessionStorage.getItem("usertype");
    // selecting sending users according to the current user type
    let url =
      category === "student"
        ? "/user/change-password"
        : "/mentor/change-password";
    url = baseUrl + url;
    const jwt = sessionStorage.getItem("jwtToken");

    // sending new password to server
    axios
      .post(url, data, {
        headers: {
          authorization: "Bearer " + jwt,
        },
      })
      .then((res) => {
        console.log(res);
        alert(res.data.message);
        showHidePwdForm();
        // setPwdForm(["", false]); //to hide the passsword form after updating password
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  };
  return (
    <div className="userInfo__changepwdForm">
      <div className="userInfo__cross" onClick={showHidePwdForm}>
        <i className="fa fa-times" aria-hidden="true"></i>
        {/* &#x274C; */}
      </div>
      <form onSubmit={submitHandler}>
        <label htmlFor="">current Password</label>
        <input
          type="password"
          name="currPwd"
          placeholder="current password"
          className="userInfo__currentPwd"
          required
        />
        <label htmlFor="">New Password</label>

        <input
          type="password"
          name="newPwd"
          placeholder="New password"
          className="userInfo__newPwd"
          required
        />
        <label htmlFor="">Re-type New Password</label>

        <input
          type="password"
          name="renewPwd"
          placeholder="Re-type new password"
          className="userInfo__retypeNewPwd"
          required
        />
        <button
          type="submit"
          className="userInfo__newPwdSubmit"
          // onClick={submitHandler}
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

const passwordValidator = (password) => {
  if (!password || typeof password !== "string") {
    console.log("Password is required");
    alert("Password is required");
    return false;
  }

  if (password.length < 7) {
    console.log("Password too small. Should be atleast 8 characters");
    alert("Password too small. Should be atleast 8 characters");
    return false;
  }
  return true;
};
