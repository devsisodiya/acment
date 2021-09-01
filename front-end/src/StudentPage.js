import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./css/UserPage.css";
import UserContextProvider from "./UserContext";
import Header from "./Header";
import UserInfo from "./UserInfo";
import Videos from "./Videos";
import StudentTasks from "./StudentTasks";
import videoIcon from "./images/icons/video-icon.png";
import mentorIcon from "./images/icons/mentor.png";
import taskIcon from "./images/icons/task-icon.png";

const baseUrl = process.env.REACT_APP_BASE_URL;
function StudentPage() {
  const history = useHistory();
  const [mainContent, setMainContent] = useState(<Videos />);

  // taking data from userContext
  const [userData, dispatch] = UserContextProvider();
  const userInfo = userData.userInfo; //accessing userinfo part inside reducer

  // checking if user is authenticated,else it will redirect to homepage
  useEffect(() => {
    const jwt = sessionStorage.getItem("jwtToken");
    console.log(jwt);

    if (!jwt) {
      history.push("/");
    }
  }, []);

  // Minimizing and maximizing sidebar width
  const adjustSidebar = () => {
    const sideBar = document.querySelector(".userpage__sidebar");
    const btnTexts = document.querySelectorAll(".userpage__sideBtn h3");
    if (btnTexts[0].style.display === "block") {
      btnTexts.forEach((btn) => {
        btn.style.display = "none";
      });
    } else {
      btnTexts.forEach((btn) => {
        btn.style.display = "block";
      });
    }
    sideBar.classList.toggle("userpage__sidebar__maximized");
  };

  // Switching between various sections
  const mainContentHandler = (e) => {
    const sideBtns = document.querySelectorAll(".userpage__sideBtn");
    console.log(sideBtns);
    sideBtns.forEach((btn) => {
      console.log(btn.classList);
      btn.classList.remove("userpage__sideBtn__active");
    });
    console.log(e.currentTarget);
    switch (e.currentTarget.id) {
      case "videoBtn": {
        setMainContent(<Videos />);
        e.currentTarget.classList.add("userpage__sideBtn__active");
        break;
      }
      case "tasksBtn": {
        setMainContent(<StudentTasks />);
        e.currentTarget.classList.add("userpage__sideBtn__active");
        break;
      }
      default: {
        setMainContent(<Videos />);
        e.currentTarget.classList.add("userpage__sideBtn__active");
      }
    }
  };

  console.log(userData);
  return (
    <div className="userpage">
      <Header />
      <div className="userpage__content">
        <div className="userpage__sidebar">
          <div
            className="userpage__hamburger"
            onClick={adjustSidebar}
            title="Toggle Sidebar"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="userpage__sidebarBtns">
            <button
              id="videoBtn"
              className="userpage__sideBtn__active userpage__sideBtn"
              onClick={mainContentHandler}
              title="Videos"
            >
              <div className="sidebarBtn__icon">
                <img src={videoIcon} alt="" />
              </div>
              <h3>Videos </h3>
            </button>
            <button
              id="tasksBtn"
              className="userpage__sideBtn"
              onClick={mainContentHandler}
              title="View tasks assigned"
            >
              <div className="sidebarBtn__icon">
                <img src={taskIcon} alt="" />
              </div>
              <h3>Tasks</h3>
            </button>
            <button
              id="mentorsBtn"
              className="userpage__sideBtn"
              onClick={mainContentHandler}
              title="View Following Mentors"
            >
              <div className="sidebarBtn__icon">
                <img src={mentorIcon} alt="" />
              </div>
              <h3>Mentors</h3>
            </button>
          </div>
        </div>
        <div className="userpage__mainContent">{mainContent}</div>
      </div>
    </div>
  );
}

export default StudentPage;
