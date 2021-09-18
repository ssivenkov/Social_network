import React from "react";
import { addPostActionCreator, updateNewPostTextActionCreator } from "../../../redux/reducers/profileReducer";
/*import { ActionsTypes } from "../../../redux/store";*/
import { MyPosts } from "./MyPosts";
import StoreContext from "../../../StoreContext";

export type PostsType = {
  id: number
  message: string
  likesCount: number
}

export type PostsStateType = {
  posts: Array<PostsType>
  messageForNewPost: string
}

/*export type Posts = {
  state: PostsStateType
  dispatch: (action: ActionsTypes) => void
  message: string
}*/

export const MyPostsContainer = (/*props: Posts*/) => {
  return (
    <StoreContext.Consumer>
      {(store) => {
        let state = store.getState();

        const addPost = function() {
          store.dispatch(addPostActionCreator());
        };

        const onPostChange = (text: string) => {
          const action = updateNewPostTextActionCreator(text);
          store.dispatch(action);
        };

        return <MyPosts updateNewPostText={onPostChange}
                        addPost={addPost}
                        message={state.profilePage.messageForNewPost}
                        posts={state.profilePage.posts}
        />;
      }
      }
    </StoreContext.Consumer>
  );
};