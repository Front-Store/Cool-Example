
import { UserStatus } from "../models/home"
import React from "react";
interface IAppContext {
  userStatus: UserStatus;
  setUserStatusTo: (status: UserStatus) => void;
}

const AppContext = React.createContext<IAppContext>({
  userStatus: UserStatus.LoggedIn,
  setUserStatusTo: () => { }
});


export default AppContext