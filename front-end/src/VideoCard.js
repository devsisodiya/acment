import React, { useRef, useState, useEffect } from "react";
import "./css/Videos.css";
import image from "./images/backwaters.jpg";
import alt_profile from "./images/icons/profile_alt_icon.svg";
import UserContextProvider from "./UserContext";
import UserInfo from "./UserInfo";

const baseUrl = process.env.REACT_APP_BASE_URL;

const VideoCard = ({ videoData, maximizeVideo, deleteVideo }) => {
  // ================  states and refs  =======================================
  const [userData] = UserContextProvider();
  const [duration, setDuration] = useState("00:00:00");
  const videoBlock = useRef();
  const videotag = useRef();
  // ======================================================================================

  useEffect(() => {
    // To set the video duration from video tag
    videotag.current.onloadedmetadata = () => {
      if (videotag.current) {
        setDuration(durationFormatter(videotag.current.duration));
      }
    };

    return (
      // For clearing the seTimout timer, so that it won't cause any problem afterwards
      clearTimeout(timer)
    );
  }, []);

  // For playing a small part of videos while hovering over video card
  let timer;
  const hoverVideoPlay = () => {
    console.log("playing video");
    videotag.current.play();
    timer = setTimeout(() => {
      if (videotag.current) {
        videotag.current.currentTime = 0;
      }
    }, 5000);
  };
  const hoverVideoPause = () => {
    console.log("pausing video");
    videotag.current.pause();
    videotag.current.currentTime = 0;
    clearTimeout(timer);
  };

  // Need to be changed later
  videoData.thumbnail = image;

  return (
    <div
      ref={videoBlock}
      className="videoCard"
      onMouseEnter={hoverVideoPlay}
      onMouseLeave={hoverVideoPause}
      onClick={() => {
        maximizeVideo(videoData);
      }}
    >
      <div className="videoCard__videoSection">
        <video
          ref={videotag}
          src={baseUrl + videoData.video}
          height="100%"
          width="100%"
          muted="muted"
          preload="metadata"
          playsInline
          loop
          poster={videoData.thumbnail}
          controlsList="nodownload"
        >
          Your browser does not support the video tag.
        </video>
        <p className="videoCard__videoDuration">{duration}</p>
      </div>
      <div className="videoCard__info">
        <div className="videoCard__mentorProfile">
          <img
            src={baseUrl + videoData.postedBy.profile}
            alt=""
            onError={(e) => {
              e.target.src = alt_profile;
              e.target.onError = null;
            }}
          />
        </div>
        <div className="videoCard__videoData">
          <h3>{videoData.topic}</h3>
          <h4>{videoData.postedBy.username}</h4>
        </div>
        {userData.category === "mentor" ? (
          <div
            className="videoCard__trash"
            onClick={(e) => {
              deleteVideo(e,videoData._id);
            }}
          >
            <i className="fa fa-trash" aria-hidden="true"></i>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default VideoCard;

const durationFormatter = (secs) => {
  secs = Math.round(secs);
  let hr = Math.floor(secs / 3600);
  secs = secs % 3600;
  let min = Math.floor(secs / 60);
  secs = secs % 60;
  hr = ("0" + hr).slice(-2);
  min = ("0" + min).slice(-2);
  secs = ("0" + secs).slice(-2);
  return hr === "00" ? `${min}:${secs}` : `${hr}:${min}:${secs}`;
};
