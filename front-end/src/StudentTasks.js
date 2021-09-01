import React, { useState, useEffect } from "react";
import "./css/Tasks.css";
import UserContextProvider from "./UserContext";
import axios from "axios";
import alt_profile from "./images/icons/profile_alt_icon.svg";

const baseUrl = process.env.REACT_APP_BASE_URL;
const studentTasksUrl = baseUrl + "/tasks";

function Tasks() {
  // =================   states   ======================
  // const [userData] = UserContextProvider();
  const [tasks, setTasks] = useState([]);
  const [taskType, settaskType] = useState("pending");
  // ===================================================

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwtToken");
    axios
      .post(
        studentTasksUrl,
        {},
        {
          headers: {
            authorization: "Bearer " + jwt,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setTasks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(tasks);

  const changeMainContent = (e, flag) => {
    console.log("changing content");
    settaskType(flag);
  };

  return (
    <div className="tasks">
      <div className="tasks__container">
        <AssignedTasks tasks={tasks} />
      </div>
    </div>
  );
}

export default Tasks;

const AssignedTasks = ({ tasks }) => {
  console.log("message from assigned tasks");
  console.log(tasks.length);
  return (
    <div className="assignedTasks">
      {tasks.length > 0 ? (
        <div className="assignedTasks__container">
          {tasks.map((task, index) => (
            <TaskCard key={index} taskData={task} />
          ))}
        </div>
      ) : (
        <h1 className="assignedTasks__notasks">No tasks yet</h1>
      )}
    </div>
  );
};

const TaskCard = ({ taskData }) => {
  console.log(taskData.postedBy.profile);
  return (
    <div className="taskCard">
      <div className="taskCard__mentorInfo">
        <div className="taskCard__mentorProfile">
          <img
            src={baseUrl + taskData.postedBy.profile}
            alt=""
            onError={(e) => {
              e.target.src = alt_profile;
              e.target.onError = null;
            }}
          />
        </div>
        <h3>{taskData.postedBy.username}</h3>
      </div>
      <div className="taskCard__taskData">
        <h3>{taskData.title}</h3>
        <p>{taskData.info}</p>
      </div>
      <div className="taskCard__taskAttachment">
        <a
          href={baseUrl + taskData.task}
          target="_blank"
          rel="noreferrer"
          // download={taskData.title}
        >
          <button>Attachment</button>
        </a>
      </div>
      <div className="taskCard__taskDue">
        <p>
          Deadline:&nbsp;&nbsp;
          {taskData.deadline
            ? new Date(taskData.deadline).toDateString() +
              "\t\t\t\t\t\t" +
              new Date(taskData.deadline).toLocaleTimeString()
            : "No due date"}
        </p>
      </div>
    </div>
  );
};
