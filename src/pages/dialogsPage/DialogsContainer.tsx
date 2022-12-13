import { ComponentType } from 'react';

import { withAuthRedirect } from 'hoc/withAuthRedirect';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { sendMessage } from 'store/reducers/dialogsReducer/dialogsReducer';
import { RootStateType } from 'store/types';

import { Dialogs } from './Dialogs';
import { MapDispatchToPropsType, MapStateToPropsType } from './types';

const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
  return {
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
    avatars: state.dialogsPage.avatars,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
  return {
    sendMessage: (newMessageBody: string) => {
      dispatch(sendMessage(newMessageBody));
    },
  };
};

export default compose<ComponentType>(
  connect<MapStateToPropsType, MapDispatchToPropsType, object, RootStateType>(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withAuthRedirect,
)(Dialogs);
