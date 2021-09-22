import {
  addPostActionCreator,
  PostsType,
  updateNewPostTextActionCreator
} from "../../../redux/reducers/profileReducer";
import { MyPosts } from "./MyPosts";
import { connect } from "react-redux";
import { RootStateType } from "../../../redux/reduxStore";
import { Dispatch } from "redux";


type DispatchToPropsType = {
  updateNewPostText: (text: string) => void
  addPost: () => void
}

type MapStateToPropsType = {
  posts: PostsType[],
  messageForNewPost: string
}

export type MyPostsPropsType = MapStateToPropsType & DispatchToPropsType;

let mapStateToProps = (state: RootStateType): MapStateToPropsType => {
  return {
    posts: state.profilePage.posts,
    messageForNewPost: state.profilePage.messageForNewPost
  };
};

let mapDispatchToProps = (dispatch: Dispatch): DispatchToPropsType => {
  return {
    updateNewPostText: (text: string) => {
      dispatch(updateNewPostTextActionCreator(text));
    },
    addPost: () => {
      dispatch(addPostActionCreator());
    }
  };
};

export const MyPostsContainer = connect<MapStateToPropsType, DispatchToPropsType, {}, RootStateType>
(mapStateToProps, mapDispatchToProps)(MyPosts);