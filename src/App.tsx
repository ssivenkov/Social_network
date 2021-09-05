import React from "react";
import "./App.css";
import "./Reset.css";
import { Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Nav } from "./components/Nav/Nav";
import { Profile } from "./components/Profile/Profile";
import { News } from "./components/News/News";
import { Music } from "./components/Music/Music";
import { Settings } from "./components/Settings/Settings";
import { Friends } from "./components/Friends/Friends";
import { ActionsTypes, RootStateType } from "./redux/store";
import { Dialogs } from "./components/Dialogs/Dialogs";

type AppType = {
  state: RootStateType
  dispatch: (action: ActionsTypes) => void
}

const App: React.FC<AppType> = (props) => {
  return (
    <div className="global-wrapper">
      <Header />
      <Nav state={props.state.sidebarFriends} />
      <div className="global-wrapper-content">
        <Route path="/dialogs" render={() => <Dialogs state={props.state.dialogsPage}
                                                      dispatch={props.dispatch}
                                                      message={props.state.dialogsPage.newMessageTextBody} />}
        />
        <Route exact path="/profile" render={() =>
          <Profile state={props.state.profilePage}
                   dispatch={props.dispatch}
                   message={props.state.profilePage.messageForNewPost} />}
        />
        <Route exact path="/news" render={() => <News />} />
        <Route exact path="/music" render={() => <Music />} />
        <Route exact path="/settings" render={() => <Settings />} />
        <Route exact path="/friends" render={() => <Friends />} />
      </div>
    </div>
  );
};

export default App;