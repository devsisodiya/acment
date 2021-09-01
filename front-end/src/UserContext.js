import { useReducer, createContext, useContext } from "react";
import reducer, { initialState } from "./reducer";

export const userContext = createContext();

export const UserProvider = ({ children }) => (
  <userContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </userContext.Provider>
);

const UserContextProvider = () => useContext(userContext);

export default UserContextProvider;
