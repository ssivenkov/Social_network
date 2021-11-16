import React from "react";
import "./App.scss";
import "./Reset.scss";
import { HashRouter, Route, withRouter } from "react-router-dom";
import { NavContainer } from "./components/Nav/NavContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import { connect, Provider } from "react-redux";
import { compose } from "redux";
import store, { RootStateType } from "./redux/reduxStore";
import { initializeApp } from "./redux/reducers/appReducer";
import { Preloader } from "./components/common/Preloader/Preloader";
import { withSuspense } from "./hoc/withSuspense";

const News = React.lazy(() => import ("./components/News/News"));
const Music = React.lazy(() => import ("./components/Music/Music"));
const Settings = React.lazy(() => import ("./components/Settings/Settings"));
const Friends = React.lazy(() => import ("./components/Friends/Friends"));
const LoginPage = React.lazy(() => import ("./components/Login/Login"));
const UsersContainer = React.lazy(() => import ("./components/Users/UsersContainer"));
const DialogsContainer = React.lazy(() => import ("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import ("./components/Profile/ProfileContainer"));

type MapDispatchToPropsType = {
    initializeApp: () => void
}

type MapStateToPropsType = {
    initialized: boolean
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
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className="global-wrapper">
                <HeaderContainer/>
                <NavContainer/>
                <div className="global-wrapper-content">
                    <Route path="/dialogs" render={withSuspense(DialogsContainer)}/>
                    <Route exact path="/profile/:userId?" render={withSuspense(ProfileContainer)}/>
                    <Route exact path="/users" render={withSuspense(UsersContainer)}/>
                    <Route exact path="/login" render={withSuspense(LoginPage)}/>
                    <Route exact path="/news" render={withSuspense(News)}/>
                    <Route exact path="/music" render={withSuspense(Music)}/>
                    <Route exact path="/settings" render={withSuspense(Settings)}/>
                    <Route exact path="/friends" render={withSuspense(Friends)}/>
                </div>
            </div>
        );
    }
}

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, RootStateType>
    (mapStateToProps, {initializeApp}))(App);

const SocialNetworkApp = () => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}

export default SocialNetworkApp;