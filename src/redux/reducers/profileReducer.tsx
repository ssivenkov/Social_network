const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET-USER-PROFILE";

export type PostsType = {
    id: number
    message: string
    likesCount: number
}

export type PostsStateType = {
    posts: Array<PostsType>
    messageForNewPost: string
    profile: any
}

let initialState = {
    messageForNewPost: "",
    posts: [
        {id: 1, message: "It's my first post.", likesCount: 20},
        {id: 2, message: "Hello, welcome!", likesCount: 15},
    ],
    profile: null,
};

const profileReducer = (state: PostsStateType = initialState, action: any): PostsStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost: PostsType = {
                id: 3,
                message: state.messageForNewPost,
                likesCount: 0,
            };
            let stateCopy = {
                ...state,
                posts: [...state.posts, newPost],
                messageForNewPost: "",
            };
            return (newPost.message.length !== 0 ? stateCopy : state);
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                messageForNewPost: action.newText,
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile,
            }
        }
        default:
            return state;
    }
};

export const addPostActionCreator = () => ({type: ADD_POST});
export const updateNewPostTextActionCreator = (newText: string) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: newText});
export const setUserProfile = (profile: any) => ({type: SET_USER_PROFILE, profile});

export default profileReducer;