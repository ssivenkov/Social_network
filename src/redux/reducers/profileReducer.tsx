import { PostsStateType, PostsType } from "../../components/Profile/MyPosts/MyPostsContainer";
import { ActionsTypes } from "../store";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

let initialState = {
  messageForNewPost: "",
  posts: [
    { id: 1, message: "It's my first post.", likesCount: 20 },
    { id: 2, message: "Hello, welcome!", likesCount: 15 }
  ]
}

const profileReducer = (state: PostsStateType = initialState, action: ActionsTypes) => {
  switch (action.type) {
    case ADD_POST:
      let newPost: PostsType = {
        id: 3,
        message: state.messageForNewPost,
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

export const addPostActionCreator = () => {
  return {
    type: ADD_POST
  } as const
}

export const updateNewPostTextActionCreator = (newText: string) => {
  return {
    type: UPDATE_NEW_POST_TEXT,
    newText: newText
  } as const
}

export default profileReducer;