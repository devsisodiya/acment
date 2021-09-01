import React, { useState } from "react";
import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

function FileUploader() {
  const [fileState, setFileState] = useState(null);
  const fileHandler = (e) => {
    setFileState(e.target.files[0]);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(fileState);
    let formData = new FormData();
    formData.append("image", fileState.name);
    formData.append("subject", "physics");
    formData.append("question", "abcd");
    formData.append("answer", "superAnswer");
    // const data = {
    //   subject: "physics",
    //   question: "abcd",
    //   imageFile: fileState["0"],
    //   answer: "answer",
    // };
    console.log(formData);
    axios
      .post(baseURL + "/mentor_test", formData)
      // headers: {
      //   "content-type": "multipart/form-data",
      // },

      .then((res) => {
        console.log("posted successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h1>File Upload</h1>
        <input type="file" name="myImage" onChange={fileHandler} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default FileUploader;
