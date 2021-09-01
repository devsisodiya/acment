import React, { useEffect, useRef } from "react";
import "./css/Chats.css";

function ChatPage({ person }) {
  const userid = "12345";

  const messages = [
    {
      userid: "12345",
      username: "john",
      message: "hello",
    },
    {
      userid: "12346",
      username: "Ron",
      message: "Hii bro",
    },
    {
      userid: "12345",
      username: "john",
      message: "How are you man?",
    },
    {
      userid: "12346",
      username: "Ron",
      message: "Fine",
    },
    {
      userid: "12346",
      username: "Ron",
      message: "How are you,btw?",
    },
    {
      userid: "12345",
      username: "john",
      message: "I am perfectly fine dude!",
    },
    {
      userid: "12346",
      username: "Ron",
      message: "How is your internship going",
    },
    {
      userid: "12345",
      username: "john",
      message: "Tired man....tired",
    },
    {
      userid: "12345",
      username: "john",
      message: "Are u trying for any internship?",
    },
    {
      userid: "12346",
      username: "Ron",
      message: "Yes bro....I may get one soon",
    },
  ];

  return (
    <div className="chatpage">
      <div className="chatpage__header">
        <div className="chatpage__headerProfile">
          <img src={person.profile} alt="" />
        </div>
        <h2>{person.username}</h2>
      </div>
      <div className="chatpage__body">
        {messages.map((msg) => (
          <Message message={msg} myId={userid} />
        ))}
      </div>
      <div className="chatpage__sendMessage">
        <input type="text" placeholder="Enter text message"/>
        <button>Send</button>
      </div>
    </div>
  );
}

export default ChatPage;

const Message = ({ message, myId }) => {
  let isSentByCurrentuser = false;

  if (message.userid === myId) isSentByCurrentuser = true;

  return isSentByCurrentuser ? (
    <div className="message sentMessage">
      <span>{message.username}</span>
      <div className="message__body sentMessage__body">{message.message}</div>
    </div>
  ) : (
    <div className="message recievedMessage">
      <span>{message.username}</span>
      <div className="message__body recievedMessage__body">
        {message.message}
      </div>
    </div>
  );
};
