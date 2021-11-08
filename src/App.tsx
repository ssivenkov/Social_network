import React from "react";
import "./App.scss";
import "./Reset.scss";
import { Route, withRouter } from "react-router-dom";
import { News } from "./components/News/News";
import { Music } from "./components/Music/Music";
import { Settings } from "./components/Settings/Settings";
import { Friends } from "./components/Friends/Friends";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import { NavContainer } from "./components/Nav/NavContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import { connect } from "react-redux";
import { compose } from "redux";
import { RootStateType } from "./redux/reduxStore";
import { initializeApp } from "./redux/reducers/appReducer";
import { Preloader } from "./components/common/Preloader/Preloader";

type MapDispatchToPropsType = {
    initializeApp: any
}

type MapStateToPropsType = {
    initialized: any
}

const mapStateToProps = (state: RootStateType) => ({
    initialized: state.app.initialized,
})

export type AppPropsType = MapStateToPropsType & MapDispatchToPropsType;

class App extends React.Component<AppPropsType> {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if(!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className="global-wrapper">
                <HeaderContainer/>
                <NavContainer/>
                <div className="global-wrapper-content">
                    <Route path="/dialogs" render={() =>
                        <DialogsContainer/>}
                    />
                    <Route exact path="/profile/:userId?" render={() =>
                        <ProfileContainer/>}
                    />
                    <Route exact path="/users" render={() =>
                        <UsersContainer/>}
                    />
                    <Route exact path="/login" render={() =>
                        <LoginPage/>}
                    />
                    <Route exact path="/news" render={() => <News/>}/>
                    <Route exact path="/music" render={() => <Music/>}/>
                    <Route exact path="/settings" render={() => <Settings/>}/>
                    <Route exact path="/friends" render={() => <Friends/>}/>
                </div>
            </div>
        );
    }
}

export default compose<React.ComponentType>(
    withRouter,
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, RootStateType>
    (mapStateToProps, {initializeApp}))(App);