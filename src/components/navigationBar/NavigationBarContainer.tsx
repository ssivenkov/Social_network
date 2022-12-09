import { connect } from 'react-redux';
import { RootStateType } from 'store/types';

import { NavigationBar } from './NavigationBar';
import { MapDispatchToPropsType, MapStateToPropsType } from './types';

const mapStateToProps = (state: RootStateType) => {
  return {
    friends: state.sidebarFriends.friends,
  };
};

const mapDispatchToProps = (): MapDispatchToPropsType => {
  return {};
};

export const NavigationBarContainer = connect<
  MapStateToPropsType,
  MapDispatchToPropsType,
  object,
  RootStateType
>(
  mapStateToProps,
  mapDispatchToProps,
)(NavigationBar);
