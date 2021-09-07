import { PostsStateType, PostsType } from "../../components/Profile/MyPosts/MyPosts";
import { ActionsTypes } from "../store";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

const profileReducer = (state: PostsStateType, action: ActionsTypes) => {
  switch (action.type) {
    case ADD_POST:
      let newPost: PostsType = {
        id: 3,
        message: action.postText,
        likesCount: 0
      };
      if (newPost.message.length !== 0) {
        state.posts.push(newPost);
        state.messageForNewPost = "";
      }
      return state;

    case UPDATE_NEW_POST_TEXT:
      state.messageForNewPost = action.newText;
      return state;

    default:
      return state;
  }
};

export const addPostActionCreator = (postText: string) => {
  return {
    type: ADD_POST,
    postText: postText
  } as const
}

export const updateNewPostTextActionCreator = (newText: string) => {
  return {
    type: UPDATE_NEW_POST_TEXT,
    newText: newText
  } as const
}

export default profileReducer;