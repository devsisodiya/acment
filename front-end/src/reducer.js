export const initialState = {
  category: "student",
  userInfo: {},
  videos: [],
  followings: [],
  followers: [],
  tasks: [],
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_USER":
      console.log("Adding user");
      return {
        ...state,
        category: action.data.category,
        userInfo: action.data.userInfo,
      };
    case "REMOVE_USER":
      console.log("removing user");
      return {
        category: "student",
        userInfo: {},
        followings: [],
      };
    case "ADD_USER_INFO":
      console.log("adding new user-info");
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.data },
      };
    case "ADD_FOLLOWINGS":
      console.log("Adding followings");
      return {
        ...state,
        followings: [...action.data],
      };
    case "ADD_TASKS":
      console.log("Adding tasks");
      return {
        ...state,
        tasks: [...action.data],
      };
    default:
      return state;
  }
};

export default reducer;
