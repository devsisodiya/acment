import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import "./css/App.css";
import HomePage from "./HomePage";
import Login from "./Login";
import StudentPage from "./StudentPage";
import MentorPage from "./MentorPage";
import FileUploader from "./FileUploader";
import axios from "axios";
import UserContextProvider from "./UserContext";

const base_url = process.env.REACT_APP_BASE_URL;

function App() {
  const [userData, dispatch] = UserContextProvider();
  const history = useHistory();

  // To fetch all the data again during refresh and store in react context api
  useEffect(() => {
    const jwt = sessionStorage.getItem("jwtToken");
    const category = sessionStorage.getItem("usertype");
    if (jwt) {
      // ==========================   Student part (user part) =======================================
      if (category === "student") {
        // To get user info and profile
        const infourl = base_url + "/user/getdetails";
        axios
          .get(infourl, {
            headers: {
              authorization: "Bearer " + jwt,
            },
          })
          .then((res) => {
            // store response returned from server related to user in the context
            const { ...user_info } = res.data;
            // console.log(jwtToken);
            user_info.profile = base_url + user_info.profile;
            console.log(user_info);

            // storing data in react context api
            dispatch({
              type: "ADD_USER",
              data: {
                category: "student",
                userInfo: user_info,
              },
            });
            console.log(userData);
          })
          .catch((err) => {
            console.log(err.message);
            alert(err.message);
          });
        console.log("userinfo fetched");
        // to get followings of student
        const followingsurl = base_url + "/user/followings";
        axios
          .post(
            followingsurl,
            {},
            {
              headers: {
                authorization: "Bearer " + jwt,
              },
            }
          )
          .then((res) => {
            // store response returned from server related to user in the context
            console.log("followings fetched");
            const userFollowings = res.data;
            console.log(userFollowings);

            // storing data in react context api
            dispatch({
              type: "ADD_FOLLOWINGS",
              data: userFollowings,
            });
          })
          .catch((err) => {
            console.log("some error occured in fetching followings");
            console.log(err.message);
            alert(err.message);
          });

        // =================================================================================

        // ===================================  Mentor part = =============================================
      } else {
        const url = base_url + "/mentor/getdetails";
        console.log(url);
        axios
          .get(url, {
            headers: {
              authorization: "Bearer " + jwt,
            },
          })
          .then((res) => {
            // store response returned from server related to user in the context
            const { ...user_info } = res.data;
            // console.log(jwtToken);
            user_info.profile = base_url + user_info.profile;
            console.log(user_info);

            // storing data in react context api
            dispatch({
              type: "ADD_USER",
              data: {
                category: "mentor",
                userInfo: user_info,
              },
            });
            console.log(userData);
          })
          .catch((err) => {
            console.log(err.message);
            alert(err.message);
          });
      }
    }
  }, []);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/mentorpage">
            <MentorPage />
          </Route>
          <Route path="/studentpage">
            <StudentPage />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
