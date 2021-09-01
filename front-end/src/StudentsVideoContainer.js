import React, { useEffect } from "react";
import UserContextProvider from "./UserContext";
import axios from "axios";

function StudentsVideoContainer() {
  const [state, dispatch] = UserContextProvider();
  
  useEffect(() => {}, []);
  return <div className="studentsVideoContainer"></div>;
}

export default StudentsVideoContainer;
