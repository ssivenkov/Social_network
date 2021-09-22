
const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

export type PostsType = {
  id: number
  message: string
  likesCount: number
}

export type PostsStateType = {
  posts: Array<PostsType>
  messageForNewPost: string
}

let initialState = {
  messageForNewPost: "",
  posts: [
    { id: 1, message: "It's my first post.", likesCount: 20 },
    { id: 2, message: "Hello, welcome!", likesCount: 15 },
  ],
};

const profileReducer = (state: PostsStateType = initialState, action: any): PostsStateType => {
  switch (action.type) {
    case ADD_POST: {
      let newPost: PostsType = {
        id: 3,
        message: state.messageForNewPost,
        likesCount: 0
      };
      let stateCopy = {
        ...state,
        posts: [...state.posts, newPost],
        messageForNewPost: ""
      };
      return (newPost.message.length !== 0 ? stateCopy : state);
    }
    case UPDATE_NEW_POST_TEXT: {
      return {
        ...state,
        messageForNewPost: action.newText
      };
    }
    default:
      return state;
  }
};

export const addPostActionCreator = () => {
  return {
    type: ADD_POST,
  } as const;
};

export const updateNewPostTextActionCreator = (newText: string) => {
  return {
    type: UPDATE_NEW_POST_TEXT,
    newText: newText,
  } as const;
};

export default profileReducer;