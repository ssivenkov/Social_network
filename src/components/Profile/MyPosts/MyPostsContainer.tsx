import React from "react";
import { addPostActionCreator, updateNewPostTextActionCreator } from "../../../redux/reducers/profileReducer";
import { ActionsTypes } from "../../../redux/store";
import { MyPosts } from "./MyPosts";

export type PostsType = {
  id: number
  message: string
  likesCount: number
}

export type PostsStateType = {
  posts: Array<PostsType>
  messageForNewPost: string
}

export type Posts = {
  state: PostsStateType
  dispatch: (action: ActionsTypes) => void
  message: string
}

export const MyPostsContainer = (props: Posts) => {
  const addPost = function() {
    props.dispatch(addPostActionCreator());
  };

  const onPostChange = (text: string) => {
    const action = updateNewPostTextActionCreator(text);
    props.dispatch(action);
  };

  return (
    <MyPosts updateNewPostText={onPostChange}
             addPost={addPost}
             message={props.message}
             posts={props.state.posts}
    />
  );
};