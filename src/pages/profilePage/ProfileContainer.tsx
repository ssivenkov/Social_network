import React, { Component, ComponentType } from 'react';

import { PATH } from 'enum/pathEnum';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import {
  getStatus,
  getUserProfile,
  savePhoto,
  saveProfile,
  updateStatus,
} from 'store/reducers/profileReducer/profileReducer';
import { RootStateType } from 'store/types';

import { Profile } from './Profile';
import { MapDispatchToPropsType, MapStateToPropsType, ProfilePropsType } from './types';

class ProfileContainer extends Component<ProfilePropsType> {
  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: Readonly<ProfilePropsType>) {
    const { match } = this.props;

    if (match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  refreshProfile() {
    const { authorizedUserId, getStatus, getUserProfile, history, match } = this.props;

    let userID;

    if (match.params.userId) {
      userID = Number(match.params.userId);
    }

    if (!userID) {
      userID = authorizedUserId;

      if (!userID) {
        history.push(`/${PATH.LOGIN}`);
      }
    }

    if (typeof userID === 'number') {
      getUserProfile(userID);
      getStatus(userID);
    }
  }

  render() {
    const { currentUser, match, profile, savePhoto, saveProfile, status, updateStatus } =
      this.props;

    return (
      <Profile
        {...this.props}
        isOwner={
          // if profile id is missing in the address bar
          match.params.userId === undefined
            ? true
            : // else compare current user id with authenticated user id
              +match.params.userId === currentUser
        }
        profile={profile}
        savePhoto={savePhoto}
        saveProfile={saveProfile}
        status={status}
        updateStatus={updateStatus}
      />
    );
  }
}

const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
  profile: state.profilePage.profile,
  isOwner: state.profilePage.isOwner,
  currentUser: state.auth.userId,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
});

export default compose<ComponentType>(
  connect<MapStateToPropsType, MapDispatchToPropsType, object, RootStateType>(
    mapStateToProps,
    { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile },
  ),
  withRouter,
)(ProfileContainer);
