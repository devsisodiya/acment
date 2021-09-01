import React, { useState } from "react";
import UserContextProvider from "./UserContext";
import "./css/NewTask.css";
import prof from "./images/backwaters.jpg";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;
const newTaskUrl = baseUrl + "/task/add";

function NewTask() {
  const [userData, dispatch] = UserContextProvider();
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assigned: [],
    deadline: "",
  });

  /////////////////////////////////   Function to define the state newtask  ///////////////////////
  const taskDefiner = (event, field) => {
    const temptask = { ...newTask };
    temptask[field] = event.target.value;
    setNewTask(temptask);
  };

  ///////////////////////////////  Function to upload the new task  ///////////////////////////////
  const uploadTask = (e) => {
    e.preventDefault();
    // if (!validate(newTask)) {
    //   return false;
    // }
    // const attachments = [...e.target.attachment.files];
    // console.log(attachments);
    const taskData = new FormData();
    taskData.append("title", newTask.title);
    taskData.append("info", newTask.description);
    // taskData.append("assigned", newTask.assigned);
    taskData.append("deadline", newTask.deadline);
    // attachments.forEach((material) => {
    //   taskData.append("task", material);
    // });
    taskData.append("fullMarks", e.target.totalPoints.value);
    taskData.append("task", e.target.attachment.files[0]);

    console.log(...taskData);
    const jwt = sessionStorage.getItem("jwtToken");
    axios
      .post(newTaskUrl, taskData, {
        headers: {
          authorization: "Bearer " + jwt,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: "ADD_TASKS",
          data: [...userData.tasks, res.data],
        });
        alert("New task succesfully created");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  // /////////////////////////  Function to validate the newtask form  //////////////////////

  // const validate = (newtask) => {
  //   if (!newtask.title || newtask.title === "") {
  //     alert("Title is required");
  //     return false;
  //   }
  //   // if (newtask.assigned.length <= 0) {
  //   //   alert("Assign the task to atleast one student");
  //   //   return false;
  //   // }
  //   if (!newtask.deadline) {
  //     alert("You haven't assigned any deadline for the task");
  //     return false;
  //   }
  //   return true;
  // };

  return (
    <div className="newTask">
      <form className="newTask__container" onSubmit={uploadTask}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title for new task"
          required
          value={newTask.title}
          onChange={(e) => {
            taskDefiner(e, "title");
          }}
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          rows="5"
          placeholder="Description for new task"
          value={newTask.description}
          onChange={(e) => {
            taskDefiner(e, "description");
          }}
        />
        {/* <label htmlFor="followers">Assign this task to</label>
        <DropDown
          followers={followers}
          newTask={newTask}
          setNewTask={setNewTask}
        /> */}
        <label htmlFor="attachment">Add study material</label>
        <input
          type="file"
          name="attachment"
          id="attachment"
          accept="application/pdf"
          required
        />
        <label htmlFor="deadline">Choose a deadline</label>
        <input
          type="datetime-local"
          name="deadline"
          id="deadline"
          onChange={(e) => {
            taskDefiner(e, "deadline");
          }}
        />
        <label htmlFor="totalPoints">Enter Total marks</label>
        <input
          type="number"
          min="0"
          name="totalPoints"
          id="totalPoints"
          placeholder="Total marks"
          required
        />
        <button type="submit">Assign Task</button>
      </form>
    </div>
  );
}

export default NewTask;

// Dropdown for selecting students
// const DropDown = ({ followers, newTask, setNewTask }) => {
//   // To control expansion and folding of dropdown
//   let expanded = false;
//   const dropDownHandler = () => {
//     const dropdown = document.querySelector(".dropdown__alloptions");
//     if (expanded) {
//       dropdown.style.display = "none";
//       expanded = false;
//     } else {
//       dropdown.style.display = "block";
//       expanded = true;
//     }
//   };

// const selectAllHandler = (e) => {
//   const allOptions = document.querySelectorAll(".dropdown__option");
//   if (e.target.checked) {
//     const ids = followers.map((follower) => follower.id);
//     allOptions.forEach((option) => option.classList.add("selected"));
//     setNewTask({ ...newTask, assigned: ids });
//   } else {
//     allOptions.forEach((option) => option.classList.remove("selected"));
//     setNewTask({ ...newTask, assigned: [] });
//   }
// };

// const checkHandler = (e, id) => {
//   const option = e.currentTarget;
//   console.log(option);
//   if (option.classList.contains("selected")) {
//     option.classList.remove("selected");
//     setNewTask({
//       ...newTask,
//       assigned: newTask.assigned.filter((ID) => ID !== id),
//     });
//   } else {
//     option.classList.add("selected");
//     setNewTask({ ...newTask, assigned: [...newTask.assigned, id] });
//   }
// };
//   return (
//     <div className="dropdown">
//       <div className="dropdown__selector" onClick={dropDownHandler}>
//         <h4>Assign this task to</h4>
//         <div className="dropdown__selectAllCheckbox">
//           <label htmlFor="selectAll">Select all</label>
//           <input
//             type="checkbox"
//             name="selectAll"
//             id="selectAll"
//             onChange={selectAllHandler}
//           />
//         </div>
//       </div>
//       <div className="dropdown__alloptions">
//         {followers.map((follower) => (
//           <div
//             className="dropdown__option"
//             onClick={(e) => checkHandler(e, follower.id)}
//           >
//             <div className="dropdown_mentorProfile">
//               <img src={follower.profile} alt="" />
//             </div>
//             <h4>{follower.username}</h4>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
