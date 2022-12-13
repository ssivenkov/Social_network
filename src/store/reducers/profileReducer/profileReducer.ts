import { SUCCESS_RESULT_CODE } from 'constants/resultCodeConstants';

import { ProfileAPI, UsersAPI } from 'api/API';
import { PROFILE_REDUCER_ACTION } from 'enum/profileReducerEnum';
import { FormAction, stopSubmit } from 'redux-form';
import { ThunkDispatch } from 'redux-thunk';
import { RootStateType } from 'store/types';

import {
  PhotosType,
  PostsType,
  ProfileReducerActionsType,
  ProfileReducerStateType,
  ProfileType,
  SaveProfileThunkType,
} from './types';

const initialState = {
  posts: [
    { id: 1, message: "It's my first post.", likesCount: 20 },
    { id: 2, message: 'Hello, welcome!', likesCount: 15 },
  ],
  profile: null,
  isOwner: false, // not use, need for TS
  status: '',
};

export const profileReducer = (
  state: ProfileReducerStateType = initialState,
  action: ProfileReducerActionsType,
): ProfileReducerStateType => {
  switch (action.type) {
    case PROFILE_REDUCER_ACTION.ADD_POST: {
      const newPost: PostsType = {
        id: state.posts.length + 1,
        message: action.newPostText,
        likesCount: 0,
      };

      return {
        ...state,
        posts: [newPost, ...state.posts],
      };
    }
    case PROFILE_REDUCER_ACTION.SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case PROFILE_REDUCER_ACTION.SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    case PROFILE_REDUCER_ACTION.DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.postId),
      };
    }
    case PROFILE_REDUCER_ACTION.SAVE_PHOTO_SUCCESS: {
      if (state.profile !== null) {
        return {
          ...state,
          profile: { ...state.profile, photos: action.photos },
        };
      } else
        return {
          ...state,
        };
    }
    default:
      return state;
  }
};

export const addPost = (newPostText: string) =>
  ({ type: PROFILE_REDUCER_ACTION.ADD_POST, newPostText } as const);

export const setUserProfile = (profile: null | ProfileType) =>
  ({ type: PROFILE_REDUCER_ACTION.SET_USER_PROFILE, profile } as const);

export const setStatus = (status: string) =>
  ({ type: PROFILE_REDUCER_ACTION.SET_STATUS, status } as const);

export const deletePost = (postId: number) =>
  ({ type: PROFILE_REDUCER_ACTION.DELETE_POST, postId } as const);

export const setPhotoSuccess = (photos: PhotosType) =>
  ({ type: PROFILE_REDUCER_ACTION.SAVE_PHOTO_SUCCESS, photos } as const);

export const getUserProfile = (userId: number) => {
  return async (
    dispatch: ThunkDispatch<RootStateType, unknown, ProfileReducerActionsType>,
  ) => {
    try {
      const response = await UsersAPI.getProfile(userId);

      dispatch(setUserProfile(response));
    } catch (error) {
      console.log(`Error getting user profile. ${error}`);
    }
  };
};

export const getStatus = (userId: number) => {
  return async (
    dispatch: ThunkDispatch<RootStateType, unknown, ProfileReducerActionsType>,
  ) => {
    try {
      const response = await ProfileAPI.getStatus(userId);

      dispatch(setStatus(response));
    } catch (error) {
      console.log(`Error getting status. ${error}`);
    }
  };
};

export const updateStatus = (status: string) => {
  return async (
    dispatch: ThunkDispatch<RootStateType, unknown, ProfileReducerActionsType>,
  ) => {
    try {
      const response = await ProfileAPI.updateStatus(status);

      if (response.resultCode === SUCCESS_RESULT_CODE) {
        dispatch(setStatus(status));
      }
    } catch (error) {
      console.log(`Error updating status. ${error}`);
    }
  };
};

export const savePhoto = (photoFile: File) => {
  return async (
    dispatch: ThunkDispatch<RootStateType, unknown, ProfileReducerActionsType>,
  ) => {
    try {
      const response = await ProfileAPI.savePhoto(photoFile);

      if (response.resultCode === SUCCESS_RESULT_CODE) {
        dispatch(setPhotoSuccess(response.data.photos));
      }
    } catch (error) {
      console.log(`Error save avatar. ${error}`);
    }
  };
};

export const saveProfile = (profile: ProfileType): SaveProfileThunkType => {
  return async (
    dispatch: ThunkDispatch<RootStateType, unknown, FormAction>,
    getState: () => RootStateType,
  ) => {
    try {
      const userId = getState().auth.userId;
      const response = await ProfileAPI.saveProfile(profile);

      if (response.resultCode === SUCCESS_RESULT_CODE && userId) {
        await dispatch(getUserProfile(userId));
      } else {
        let listOfSitesWithErrors = response.messages.map((message: string) => {
          return message.toLowerCase().match(/(?<=>)\D+[^)]/gi)![0];
        });

        listOfSitesWithErrors = listOfSitesWithErrors.join(', ');
        if (response.messages.length === 1) {
          dispatch(
            stopSubmit('edit-profile', {
              _error: `Invalid url format in ${listOfSitesWithErrors} input`,
            }),
          );
        } else {
          dispatch(
            stopSubmit('edit-profile', {
              _error: `Invalid url format in inputs: ${listOfSitesWithErrors}`,
            }),
          );
        }

        // dispatch(stopSubmit("edit-profile", {"contacts": {"facebook": response.messages[0]}}));
        return Promise.reject(response.messages);
      }
    } catch (error) {
      console.log(`Error saving profile information. ${error}`);
    }
  };
};
