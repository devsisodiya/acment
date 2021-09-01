import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./css/UserPage.css";
import UserContextProvider from "./UserContext";
import Header from "./Header";
import UserInfo from "./UserInfo";
import axios from "axios";
import MentorVideos from "./MentorVideos";
import MentorTasks from "./MentorTasks";
import Chats from "./Chats";
import videoIcon from "./images/icons/video-icon.png";
import studentIcon from "./images/icons/student_icon.svg";
import taskIcon from "./images/icons/task-icon.png";

const baseUrl = process.env.REACT_APP_BASE_URL;

function MentorPage() {
  const history = useHistory();
  const [mainContent, setMainContent] = useState(<MentorVideos />);
  // taking data from userContext
  const [userData, dispatch] = UserContextProvider();
  const userInfo = userData.userInfo; //accessing userinfo part inside reducer

  // checking if user is authenticated,else it will redirect to homepage
  useEffect(() => {
    const jwt = sessionStorage.getItem("jwtToken");

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
    sideBtns.forEach((btn) => {
      btn.classList.remove("userpage__sideBtn__active");
    });
    switch (e.currentTarget.id) {
      case "videoBtn": {
        setMainContent(<MentorVideos />);
        e.currentTarget.classList.add("userpage__sideBtn__active");
        break;
      }
      case "tasksBtn": {
        setMainContent(<MentorTasks />);
        e.currentTarget.classList.add("userpage__sideBtn__active");
        break;
      }
      default: {
        setMainContent(<Chats />);
        e.currentTarget.classList.add("userpage__sideBtn__active");
      }
    }
  };

  return (
    <div className="userpage">
      <Header />
      <div className="userpage__content">
        <div className="userpage__sidebar">
          <div className="userpage__hamburger" onClick={adjustSidebar}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="userpage__sidebarBtns">
            <button
              id="videoBtn"
              className="userpage__sideBtn__active userpage__sideBtn"
              onClick={mainContentHandler}
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
            >
              <div className="sidebarBtn__icon">
                <img src={studentIcon} alt="" />
              </div>
              <h3>Chats</h3>
            </button>
          </div>
        </div>
        <div className="userpage__mainContent">{mainContent}</div>
      </div>
    </div>
  );
}

export default MentorPage;
