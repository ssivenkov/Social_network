import { ProfileAPI, UsersAPI } from "../../api/API";
import { ThunkDispatch } from "redux-thunk";
import { RootStateType } from "../reduxStore";
import { FormAction, stopSubmit } from "redux-form";

const ADD_POST = "social_network/profile/ADD-POST";
const SET_USER_PROFILE = "social_network/profile/SET-USER-PROFILE";
const SET_STATUS = "social_network/profile/SET-STATUS";
const DELETE_POST = "social_network/profile/DELETE-POST";
const SAVE_PHOTO_SUCCESS = "social_network/profile/SAVE-PHOTO-SUCCESS";

export type PostsType = {
    id: number
    message: string
    likesCount: number
}

type PhotosType = {
    small: string | null
    large: string | null
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
    photos: PhotosType
    userId: number
}

type ProfileStateType = {
    posts: Array<PostsType>
    profile: ProfileType | null
    isOwner: boolean
    status: string
}

let initialState = {
    posts: [
        {id: 1, message: "It's my first post.", likesCount: 20},
        {id: 2, message: "Hello, welcome!", likesCount: 15},
    ],
    profile: null,
    isOwner: false,
    status: "",
}

type AddPostActionType = ReturnType<typeof addPost>
type SetUserProfileActionType = ReturnType<typeof setUserProfile>
type SetStatusActionType = ReturnType<typeof setStatus>
type DeletePostActionType = ReturnType<typeof deletePost>
type SetPhotoSuccessActionType = ReturnType<typeof setPhotoSuccess>

export type ProfileActionsType = AddPostActionType
    | SetUserProfileActionType
    | SetStatusActionType
    | DeletePostActionType
    | SetPhotoSuccessActionType

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
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile!, photos: action.photos},
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
export const setPhotoSuccess = (photos: PhotosType) =>
    ({type: SAVE_PHOTO_SUCCESS, photos} as const)

export const getUserProfile = (userId: number) => {
    return async (dispatch: ThunkDispatch<RootStateType, unknown, ProfileActionsType>) => {
        const response = await UsersAPI.getProfile(userId);
        dispatch(setUserProfile(response));
    };
}

export const getStatus = (userId: number) => {
    return async (dispatch: ThunkDispatch<RootStateType, unknown, ProfileActionsType>) => {
        const response = await ProfileAPI.getStatus(userId);
        dispatch(setStatus(response));
    };
}

export const updateStatus = (status: string) => {
    return async (dispatch: ThunkDispatch<RootStateType, unknown, ProfileActionsType>) => {
        const response = await ProfileAPI.updateStatus(status);
        if (response.resultCode === 0) {
            dispatch(setStatus(status));
        }
    };
}

export const savePhoto = (photoFile: File) => {
    return async (dispatch: ThunkDispatch<RootStateType, unknown, ProfileActionsType>) => {
        const response = await ProfileAPI.savePhoto(photoFile);
        if (response.resultCode === 0) {
            dispatch(setPhotoSuccess(response.data.photos));
        }
    };
}

export const saveProfile = (profile: ProfileType) => {
    return async (dispatch: ThunkDispatch<RootStateType, unknown, FormAction>, getState: any) => {
        const userId = getState().auth.userId;
        const response = await ProfileAPI.saveProfile(profile);
        if (response.resultCode === 0) {
            await dispatch(getUserProfile(userId));
        } else {
            let listOfSitesWithErrors = response.messages.map((el: string) => {
                return (el.toLowerCase()).match(/(?<=>)\D+[^)]/ig)![0];
            })
            listOfSitesWithErrors = listOfSitesWithErrors.join(", ");
            if (response.messages.length === 1) {
                dispatch(stopSubmit("edit-profile", {_error: `Invalid url format in ${listOfSitesWithErrors} input`}));
            } else {
                dispatch(stopSubmit("edit-profile", {_error: `Invalid url format in inputs: ${listOfSitesWithErrors}`}));
            }
            // dispatch(stopSubmit("edit-profile", {"contacts": {"facebook": response.messages[0]}}));
            return Promise.reject(response.messages);
        }
    };
}

export default profileReducer;