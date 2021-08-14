import React from "react";
import "./App.css";
import "./Reset.css";
import { Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Nav, NavStateType } from "./components/Nav/Nav";
import { Profile } from "./components/Profile/Profile";
import { News } from "./components/News/News";
import { Music } from "./components/Music/Music";
import { Settings } from "./components/Settings/Settings";
import { Dialogs, DialogsStateType } from "./components/Dialogs/Dialogs";
import { PostsStateType } from "./components/Profile/MyPosts/MyPosts";
import { Friends } from "./components/Friends/Friends";

type StateType = {
  profilePage: PostsStateType
  dialogsPage: DialogsStateType
  sidebarFriends: NavStateType
}

type AppType = {
  state: StateType
}

function App(props: AppType) {
  return (
      <div className="global-wrapper">
        <Header />
        <Nav state={props.state.sidebarFriends} />
        <div className="global-wrapper-content">
          <Route path="/dialogs" render={() => <Dialogs state={props.state.dialogsPage} />} />
          <Route exact path="/profile" render={() => <Profile state={props.state.profilePage} />} />
          <Route exact path="/news" render={() => <News />} />
          <Route exact path="/music" render={() => <Music />} />
          <Route exact path="/settings" render={() => <Settings />} />
          <Route exact path="/friends" render={() => <Friends />} />
        </div>
      </div>
  );
}

export default App;