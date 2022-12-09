import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { addPost } from 'store/reducers/profileReducer/profileReducer';
import { RootStateType } from 'store/types';

import { MyPosts } from './MyPosts';
import {
  MapDispatchToPropsType,
  MapStateToPropsType,
  MyPostsCommonPropsType,
} from './types';

const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
  return {
    posts: state.profilePage.posts,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
  return {
    addPost: (newPostText: string) => {
      dispatch(addPost(newPostText));
    },
  };
};

export const MyPostsContainer = connect<
  MapStateToPropsType,
  MapDispatchToPropsType,
  MyPostsCommonPropsType,
  RootStateType
>(
  mapStateToProps,
  mapDispatchToProps,
)(MyPosts);
