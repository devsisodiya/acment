import React, { useState, useEffect } from "react";
import "./css/Tasks.css";
import NewTask from "./NewTask";
import axios from "axios";
import UserContextProvider from "./UserContext";
// import alt_profile from "./images/icons/profile_alt_icon.svg";
import "font-awesome/css/font-awesome.min.css";

const baseUrl = process.env.REACT_APP_BASE_URL;
const mentorTasksUrl = baseUrl + "/mentor/tasks";
const deleteTaskUrl = baseUrl + "/task/delete";

function MentorTasks() {
  // =================   states   ======================
  const [userData, dispatch] = UserContextProvider();
  // const [tasks, setTasks] = useState([]);
  const [taskPageType, setTaskPageType] = useState("assigned");
  // ===================================================

  const taskPageSwitcher = (e, val) => {
    const btns = document.querySelectorAll(".tasks__switchBtn");
    btns.forEach((btn) => btn.classList.remove("tasks__switchBtn__active"));
    e.target.classList.add("tasks__switchBtn__active");
    setTaskPageType(val);
  };

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwtToken");
    axios
      .post(
        mentorTasksUrl,
        {},
        {
          headers: {
            authorization: "Bearer " + jwt,
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: "ADD_TASKS",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // setTasks([...tasks, taskData]);
  }, []);

  // console.log(tasks);
  let tasks = userData.tasks;

  return (
    <div className="tasks">
      <div className="tasks__header">
        <button
          onClick={(e) => {
            taskPageSwitcher(e, "assigned");
          }}
          className="tasks__switchBtn tasks__switchBtn__active"
        >
          Assigned Tasks
        </button>
        <button
          onClick={(e) => {
            taskPageSwitcher(e, "new");
          }}
          className="tasks__switchBtn"
        >
          New Task
        </button>
      </div>
      <div className="tasks__container">
        {taskPageType === "assigned" ? (
          <AssignedTasks tasks={tasks} />
        ) : (
          <NewTask />
        )}
      </div>
    </div>
  );
}

export default MentorTasks;

const AssignedTasks = ({ tasks }) => {
  console.log("message from assigned tasks");
  return (
    <div className="assignedTasks">
      {tasks && tasks.length > 0 ? (
        <div className="assignedTasks__container">
          {tasks.map((task, index) => (
            <TaskCard key={index} taskData={task} />
          ))}
        </div>
      ) : (
        <div className="assignedTasks__notasks">No tasks yet</div>
      )}
    </div>
  );
};

const TaskCard = ({ taskData }) => {
  const [userData, dispatch] = UserContextProvider();
  const deleteTask = (e, task) => {
    const flag = window.confirm("Deleting the selected task");
    if (!flag) return;
    const jwt = sessionStorage.getItem("jwtToken");
    axios
      .post(
        deleteTaskUrl,
        {
          taskId: task._id,
        },
        {
          headers: {
            authorization: "Bearer " + jwt,
          },
        }
      )
      .then((res) => {
        // Here response is in {deleted:bool,data:{}}...Therefore res.data.data is used
        console.log(res);
        if (res.data.deleted) {
          const tasks = userData.tasks.filter(
            (task) => task._id !== res.data.data._id
          );
          dispatch({
            type: "ADD_TASKS",
            data: tasks,
          });
        } else {
          alert("Task deletion was unsuccessful");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="taskCard mentorTaskCard">
      {/* <div className="taskCard__mentorInfo">
        <div className="taskCard__mentorProfile">
          <img
            src={userData.userInfo.profile}
            alt=""
            onError={(e) => {
              e.target.src = alt_profile;
              e.target.onError = null;
            }}
          />
        </div>
        <h4>{taskData.username}</h4>
      </div> */}
      <div
        className="tasks__deleteBtn"
        title="Delete this task"
        onClick={(e) => {
          deleteTask(e, taskData);
        }}
      >
        <i className="fa fa-trash" aria-hidden="true"></i>
      </div>
      <div className="taskCard__taskTitle">
        <h3>{taskData.title}</h3>
      </div>
      <div className="taskCard__taskInfo">
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
      <div className="taskCard__bottom">
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
        <div className="taskCard__points">
          <p>
            Total points:&nbsp;&nbsp;
            {taskData.fullMarks ? taskData.fullMarks : "0"}
          </p>
        </div>
      </div>
    </div>
  );
};
