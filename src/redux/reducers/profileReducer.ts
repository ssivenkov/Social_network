import { ProfileAPI, UsersAPI } from "../../api/API";
import { ThunkDispatch } from "redux-thunk";
import { RootStateType } from "../reduxStore";

const ADD_POST = "social_network/profile/ADD-POST";
const SET_USER_PROFILE = "social_network/profile/SET-USER-PROFILE";
const SET_STATUS = "social_network/profile/SET-STATUS";
const DELETE_POST = "social_network/profile/DELETE-POST"

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
    profile: null | ProfileType
    status: string
}

let initialState = {
    posts: [
        {id: 1, message: "It's my first post.", likesCount: 20},
        {id: 2, message: "Hello, welcome!", likesCount: 15},
    ],
    profile: null,
    status: "",
}

export type AddPostActionType = ReturnType<typeof addPost>
export type SetUserProfileActionType = ReturnType<typeof setUserProfile>
export type SetStatusActionType = ReturnType<typeof setStatus>
export type DeletePostActionType = ReturnType<typeof deletePost>

export type ProfileActionsType = AddPostActionType
    | SetUserProfileActionType
    | SetStatusActionType
    | DeletePostActionType

const profileReducer = (state: ProfileStateType = initialState, action: ProfileActionsType): ProfileStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost: PostsType = {
                id: 3,
                message: action.newPostText,
                likesCount: 0,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile,
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status,
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId),
            }
        }
        default:
            return state;
    }
};

export const addPost = (newPostText: string) =>
    ({type: ADD_POST, newPostText} as const)
export const setUserProfile = (profile: null | ProfileType) =>
    ({type: SET_USER_PROFILE, profile} as const)
export const setStatus = (status: string) =>
    ({type: SET_STATUS, status} as const)
export const deletePost = (postId: number) =>
    ({type: DELETE_POST, postId} as const)

export const getUserProfile = (userId: number) => {
    return async (dispatch: ThunkDispatch<RootStateType, unknown, ProfileActionsType>) => {
        let response = await UsersAPI.getProfile(userId);
        dispatch(setUserProfile(response));
    };
}

export const getStatus = (userId: number) => {
    return async (dispatch: ThunkDispatch<RootStateType, unknown, ProfileActionsType>) => {
        let response = await ProfileAPI.getStatus(userId);
        dispatch(setStatus(response));
    };
}

export const updateStatus = (status: string) => {
    return async (dispatch: ThunkDispatch<RootStateType, unknown, ProfileActionsType>) => {
        let response = await ProfileAPI.updateStatus(status);
        if (response.resultCode === 0) {
            dispatch(setStatus(status));
        }
    };
}

export default profileReducer;