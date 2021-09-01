import React, { useRef, useState, useEffect } from "react";
import "./css/Videos.css";
import image from "./images/backwaters.jpg";
import VideoCard from "./VideoCard";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
import UserContextProvider from "./UserContext";

const baseUrl = process.env.REACT_APP_BASE_URL;

function MentorVideos() {
  const [userData] = UserContextProvider(); //To get the username of mentor
  const [videos, setVideos] = useState([]); //To store the data of videos got from server
  const [videoData, setvideoData] = useState({}); //To storing data about video to be shown in large screen
  const videoLarge = useRef();

  // ==========================   Video Upload part  ====================================

  const uploadVideo = (e) => {
    e.preventDefault();
    const videoData = new FormData();
    videoData.append("video", e.target.video.files[0]);
    videoData.append("topic", e.target.title.value);
    videoData.append("desc", e.target.description.value);
    videoData.append("username", userData.userInfo.username);

    console.log(videoData);

    const jwt = sessionStorage.getItem("jwtToken");
    // const category = userData.category;

    //  API URL part
    const videoURL = baseUrl + "/videos";
    console.log(videoURL);

    axios
      .post(videoURL, videoData, {
        headers: {
          authorization: "Bearer " + jwt,
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        showUploadForm();
        getVideos();
        // alert(res.statusText);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  // ==================================  Fetching all videos from backend to show in frontend  =======================================================

  const getVideos = () => {
    if (!userData.userInfo.userId) {
      console.log(
        "aborting mentor video fetching due to unavailabilty of mentor id"
      );
      return;
    }
    console.log("collecting mentor videos");
    console.log(userData);
    const url = baseUrl + "/myvideos/" + userData.userInfo.userId;
    console.log(url);
    const jwt = sessionStorage.getItem("jwtToken");
    axios
      .get(url, {
        headers: {
          authorization: "Bearer " + jwt,
        },
      })
      .then((res) => {
        console.log(res);
        setVideos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ============================   Deleting a particular video  =====================================

  const deleteVideo = (event, videoId) => {
    event.stopPropagation();
    const url = baseUrl + "/video/" + videoId;
    console.log(url);
    const jwt = sessionStorage.getItem("jwtToken");
    axios
      .delete(url, {
        headers: {
          authorization: "Bearer " + jwt,
        },
      })
      .then((res) => {
        console.log(res);
        getVideos();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ====================    Video upload form opener  =========================

  const showUploadForm = () => {
    const uploadForm = document.querySelector(".videoUploadForm");
    console.log(uploadForm.style.display);
    uploadForm.classList.toggle("showVideoUploadForm");
  };

  // ====================== maximizing and minimizing the video screen  ========================================
  const maximizeVideo = (vidData) => {
    const largeScreen = document.querySelector(".videos__largeScreen");
    setvideoData({
      ...vidData,
      video: baseUrl + vidData.video,
    });
    largeScreen.classList.add("videos__showlargeScreen");
    videoLarge.current.onloadedmetadata = () => {
      videoLarge.current.play();
    };
  };
  const minimizeVideo = () => {
    const largeScreen = document.querySelector(".videos__largeScreen");
    largeScreen.classList.remove("videos__showlargeScreen");
    videoLarge.current.pause();
  };

  // ============================== To fetch videos when mentor page is loaded  ======================================================

  useEffect(() => {
    console.log(userData);
    getVideos();
  }, [userData.userInfo.userId]);

  return (
    <div className="videos">
      <div className="videos__largeScreen">
        <div className="videos__largeScreenClose" onClick={minimizeVideo}>
          <i class="fa fa-times" aria-hidden="true"></i>
        </div>
        <div className="videos__largeScreenVideo">
          <video
            ref={videoLarge}
            src={videoData.video}
            height="100%"
            width="100%"
            // muted="muted"
            preload="metadata"
            playsInline
            controls
            poster={videoData.thumbnail}
            controlsList="nodownload"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="videos__container">
        {videos.map((video, index) => (
          <div className="videos__card">
            <VideoCard
              key={index}
              videoData={video}
              maximizeVideo={maximizeVideo}
              deleteVideo={deleteVideo}
            />
          </div>
        ))}
      </div>
      <button onClick={showUploadForm} className="uploadFormBtn">
        Upload Video
      </button>
      <div className="videoUploadForm">
        <form onSubmit={uploadVideo}>
          <h2>Upload Video</h2>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title of the video"
          />
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="5"
            placeholder="Description"
          />
          <input type="file" accept="video/*" name="video" id="video" />
          <button type="submit">Upload</button>
          <div className="videos__UploadFormClose" onClick={showUploadForm}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MentorVideos;
