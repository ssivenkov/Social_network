import { UsersAPI } from "../../api/UsersAPI";
import { Dispatch } from "redux";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET-USER-PROFILE";

export type PostsType = {
    id: number
    message: string
    likesCount: number
}

export type ProfileType = {
    aboutMe: string | null
    contacts: {
        facebook: string | null
        github: string | null
        instagram: string | null
        mainLink: string | null
        twitter: string | null
        vk: string | null
        website: string | null
        youtube: string | null
    }
    fullName: string | null
    lookingForAJob: boolean | null
    lookingForAJobDescription: string | null
    photos: {
        small: string | null
        large: string | null
    }
    userId: number
}

export type PostsStateType = {
    posts: Array<PostsType>
    messageForNewPost: string
    profile: null | ProfileType
}

export type AddPostActionType = {
    type: "ADD-POST"
};
export type UpdateNewPostActionType = {
    type: "UPDATE-NEW-POST-TEXT"
    newText: string
};
export type SetUserProfileActionType = {
    type: "SET-USER-PROFILE"
    profile: null | ProfileType
};

type ProfileActionsType = AddPostActionType
    | UpdateNewPostActionType
    | SetUserProfileActionType

let initialState = {
    messageForNewPost: "",
    posts: [
        {id: 1, message: "It's my first post.", likesCount: 20},
        {id: 2, message: "Hello, welcome!", likesCount: 15},
    ],
    profile: null,
};

const profileReducer = (state: PostsStateType = initialState, action: ProfileActionsType): PostsStateType => {
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

export const addPostActionCreator = (): AddPostActionType => ({type: ADD_POST});
export const updateNewPostTextActionCreator = (newText: string): UpdateNewPostActionType =>
    ({type: UPDATE_NEW_POST_TEXT, newText: newText});
export const setUserProfile = (profile: null | ProfileType): SetUserProfileActionType =>
    ({type: SET_USER_PROFILE, profile});

export const getUserProfile = (userId: number) => (dispatch: Dispatch<ProfileActionsType>) => {
    UsersAPI.getProfile(userId)
        .then(data => {
            dispatch(setUserProfile(data));
        })
        .catch((error) => {
            console.log(error);
        });
};

export default profileReducer;