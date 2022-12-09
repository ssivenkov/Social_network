import React, { Component, ComponentType } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { logout } from 'store/reducers/authReducer/authReducer';
import { RootStateType } from 'store/types';

import { Settings } from './Settings';
import {
  MapDispatchToPropsType,
  MapStateToPropsType,
  SettingsContainerPropsType,
} from './types';

const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
  return {
    isOwner: state.auth.userId,
  };
};

class SettingsContainer extends Component<SettingsContainerPropsType> {
  render() {
    const { isOwner, logout } = this.props;

    return <Settings isOwner={isOwner} logout={logout} />;
  }
}

export default compose<ComponentType>(
  connect<MapStateToPropsType, MapDispatchToPropsType, object, RootStateType>(
    mapStateToProps,
    { logout },
  ),
)(SettingsContainer);
