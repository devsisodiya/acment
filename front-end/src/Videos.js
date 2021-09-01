import React, { useRef, useState, useEffect } from "react";
import "./css/Videos.css";
import VideoCard from "./VideoCard";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";

const baseUrl = process.env.REACT_APP_BASE_URL;

function Videos() {
  const [videos, setVideos] = useState([]);
  const [videoData, setvideoData] = useState({});
  const videoLarge = useRef();

  // Fetching all videos from backend to show in frontend
  const getVideos = () => {
    const url = baseUrl + "/allvideos";
    console.log(url);
    const jwt = sessionStorage.getItem("jwtToken");
    axios
      .get(url, {})
      .then((res) => {
        console.log(res);
        setVideos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getVideos();
  }, []);

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

  return (
    <div className="videos">
      <div className="videos__largeScreen">
        <div className="videos__largeScreenClose" onClick={minimizeVideo}>
          <i className="fa fa-times" aria-hidden="true"></i>
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
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Videos;
