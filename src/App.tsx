import React from "react";
import "./App.css";
import "./Reset.css";
import { Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Profile } from "./components/Profile/Profile";
import { News } from "./components/News/News";
import { Music } from "./components/Music/Music";
import { Settings } from "./components/Settings/Settings";
import { Friends } from "./components/Friends/Friends";
import { DialogsContainer } from "./components/Dialogs/DialogsContainer";
import { NavContainer } from "./components/Nav/NavContainer";
import UsersContainer from "./components/Users/UsersContainer";

const App: React.FC = () => {
  return (
    <div className="global-wrapper">
      <Header/>
      <NavContainer/>
      <div className="global-wrapper-content">
        <Route path="/dialogs" render={() =>
          <DialogsContainer/>}
        />
        <Route exact path="/profile" render={() =>
          <Profile/>}
        />
        <Route exact path="/users" render={() =>
          <UsersContainer/>}
        />
        <Route exact path="/news" render={() => <News/>}/>
        <Route exact path="/music" render={() => <Music/>}/>
        <Route exact path="/settings" render={() => <Settings/>}/>
        <Route exact path="/friends" render={() => <Friends/>}/>
      </div>
    </div>
  );
};

export default App;