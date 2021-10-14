import { UsersAPI } from "../../api/API";
import { ThunkDispatch } from "redux-thunk";
import { RootStateType } from "../reduxStore";

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

export type ProfileStateType = {
    posts: Array<PostsType>
    messageForNewPost: string
    profile: null | ProfileType
}

let initialState = {
    messageForNewPost: "",
    posts: [
        {id: 1, message: "It's my first post.", likesCount: 20},
        {id: 2, message: "Hello, welcome!", likesCount: 15},
    ],
    profile: null,
}

export type AddPostActionType = ReturnType<typeof addPost>
export type UpdateNewPostActionType = ReturnType<typeof updateNewPostText>
export type SetUserProfileActionType = ReturnType<typeof setUserProfile>

export type ProfileActionsType = AddPostActionType
    | UpdateNewPostActionType
    | SetUserProfileActionType

const profileReducer = (state: ProfileStateType = initialState, action: ProfileActionsType): ProfileStateType => {
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

export const addPost = () =>
    ({type: ADD_POST} as const)
export const updateNewPostText = (newText: string) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: newText} as const)
export const setUserProfile = (profile: null | ProfileType) =>
    ({type: SET_USER_PROFILE, profile} as const)

export const getUserProfile = (userId: number) => {
    return (dispatch: ThunkDispatch<RootStateType, unknown, ProfileActionsType>) => {
        UsersAPI.getProfile(userId)
            .then(data => {
                dispatch(setUserProfile(data));
            })
            .catch((error) => {
                console.log(error);
            });
    };
}

export default profileReducer;