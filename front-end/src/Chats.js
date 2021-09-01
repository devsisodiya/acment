import React from "react";
import "./css/Chats.css";
import ChatPage from "./ChatPage";
import image from "./images/backwaters.jpg";
import UserContextProvider from "./UserContext";

function Chats() {
  const [userData] = UserContextProvider();
  const userInfo = userData.userInfo;

  const person = {
    profile: image,
    username: "Raju",
  };

  return (
    <div className="chats">
      <div className="chats__sidebar">
        <div className="chats__sidebarlistHeader">
          <h2>Students</h2>
        </div>

        <div className="chats__sidebarlist">
          <ChatListItem user={person} />
          <ChatListItem user={person} />
          <ChatListItem user={person} />
          <ChatListItem user={person} />
          <ChatListItem user={person} />
          <ChatListItem user={person} />
          <ChatListItem user={person} />
        </div>
      </div>
      <div className="chats__chatpage">
        <ChatPage person={person} />
      </div>
    </div>
  );
}

export default Chats;

const ChatListItem = ({ user }) => {
  console.log(user);
  return (
    <div className="chatListItem">
      <div className="chatListItem__profile">
        <img src={user.profile} alt="" />
      </div>
      <div className="chatListItem__userInfo">
        <h3>{user.username}</h3>
      </div>
    </div>
  );
};
