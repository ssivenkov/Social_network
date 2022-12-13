import React, { Component, FunctionComponent, lazy } from 'react';

import './app.scss';
import './normalize.scss';

import { Preloader } from 'components/common/preloader/Preloader';
import { NavigationBarContainer } from 'components/navigationBar/NavigationBarContainer';
import { PATH } from 'enum/pathEnum';
import { withSuspense } from 'hoc/withSuspense';
import { connect, Provider } from 'react-redux';
import { HashRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { initializeApp } from 'store/reducers/appReducer/appReducer';
import { store } from 'store/store';

import { Header } from './components/header/Header';
import { RootStateType } from './store/types';
import { AppPropsType, MapDispatchToPropsType, MapStateToPropsType } from './types';

const DialogsContainer = lazy(() => import('pages/dialogsPage/DialogsContainer'));
const ProfileContainer = lazy(() => import('pages/profilePage/ProfileContainer'));
const UsersContainer = lazy(() => import('pages/usersPage/UsersContainer'));
const LoginPage = lazy(() => import('pages/loginPage/LoginPage'));
const SettingsContainer = lazy(() => import('pages/settingsPage/SettingsContainer'));
const FriendsContainer = lazy(() => import('pages/friendsPage/FriendsPageContainer'));
const MusicPage = lazy(() => import('pages/musicPage/MusicPage'));
const Page404 = lazy(() => import('pages/page404/Page404'));

const SuspendedDialogsPage = withSuspense(DialogsContainer);
const SuspendedProfilePage = withSuspense(ProfileContainer);
const SuspendedUsersPage = withSuspense(UsersContainer);
const SuspendedLoginPage = withSuspense(LoginPage);
const SuspendedSettingsPage = withSuspense(SettingsContainer);
const SuspendedFriendsPage = withSuspense(FriendsContainer);
const SuspendedMusicPage = withSuspense(MusicPage);
const SuspendedPage404 = withSuspense(Page404);

const mapStateToProps = (state: RootStateType) => ({
  initialized: state.app.initialized,
});

class App extends Component<AppPropsType> {
  componentDidMount() {
    const { initializeApp } = this.props;

    initializeApp();
  }

  render() {
    const { initialized } = this.props;

    if (!initialized) {
      return <Preloader />;
    }

    return (
      <div>
        <Header />
        <div className='appWrapper'>
          <NavigationBarContainer />
          <div className='appContent'>
            <Switch>
              <Route
                exact={true}
                path='/'
                render={() => <Redirect to={`/${PATH.PROFILE}`} />}
              />
              <Route
                path={`/${PATH.PROFILE}/:${PATH.USER_ID}?`}
                render={() => <SuspendedProfilePage />}
              />
              <Route path={`/${PATH.DIALOGS}`} render={() => <SuspendedDialogsPage />} />
              <Route path={`/${PATH.USERS}`} render={() => <SuspendedUsersPage />} />
              <Route path={`/${PATH.LOGIN}`} render={() => <SuspendedLoginPage />} />
              <Route path={`/${PATH.MUSIC}`} render={SuspendedMusicPage} />
              <Route
                path={`/${PATH.SETTINGS}`}
                render={() => <SuspendedSettingsPage />}
              />
              <Route path={`/${PATH.FRIENDS}`} render={() => <SuspendedFriendsPage />} />
              <Route path={`/${PATH.ANY_PAGE}`} render={SuspendedPage404} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

const AppContainer = compose<FunctionComponent>(
  withRouter,
  connect<MapStateToPropsType, MapDispatchToPropsType, object, RootStateType>(
    mapStateToProps,
    { initializeApp },
  ),
)(App);

export const SocialNetworkApp = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </HashRouter>
  );
};
