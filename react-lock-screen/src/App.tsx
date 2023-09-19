import React from "react";
import 'moment/locale/zh-cn';
import "./App.scss";

import { UserStatus } from "./models/home"
import AppContext from "./contexts/homeContext"
import TimeInfo from "./components/timeInfo"
import Menu from "./views/home/index"

const Background: React.FC = () => {
  const { userStatus, setUserStatusTo } = React.useContext(AppContext);

  const handleOnClick = (): void => {
    if (userStatus === UserStatus.LoggedOut) {
      setUserStatusTo(UserStatus.LoggedIn);
    }
  }

  return (
    <div id="app-background" onClick={handleOnClick}>
      <div id="app-background-image" className="background-image" />
    </div>
  )
}

const App: React.FC = () => {
  const [userStatus, setUserStatusTo] = React.useState<UserStatus>(UserStatus.LoggedOut);

  const getStatusClass = (): string => {
    return userStatus.replace(/\s+/g, "-").toLowerCase();
  }

  return (
    <AppContext.Provider value={{ userStatus, setUserStatusTo }}>
      <div id="app" className={getStatusClass()}>
        <TimeInfo id="app-info" />
        <Menu />
        <Background />
      </div>
    </AppContext.Provider>
  )
}

export default App;