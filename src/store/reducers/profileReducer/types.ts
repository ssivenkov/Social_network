import { FormAction } from 'redux-form';
import { ThunkAction } from 'redux-thunk';
import { RootStateType } from 'store/types';
import { NullableType } from 'types/nullableType';

import {
  addPost,
  deletePost,
  setPhotoSuccess,
  setStatus,
  setUserProfile,
} from './profileReducer';

export type PostsType = {
  id: number;
  message: string;
  likesCount: number;
};

export type PhotosType = {
  small: NullableType<string>;
  large: NullableType<string>;
};

export type ProfileContacts = {
  facebook: NullableType<string>;
  github: NullableType<string>;
  instagram: NullableType<string>;
  mainLink: NullableType<string>;
  twitter: NullableType<string>;
  vk: NullableType<string>;
  website: NullableType<string>;
  youtube: NullableType<string>;
};

export type ProfileType = {
  aboutMe: NullableType<string>;
  contacts: ProfileContacts;
  fullName: NullableType<string>;
  lookingForAJob: NullableType<boolean>;
  lookingForAJobDescription: NullableType<string>;
  photos: PhotosType;
  userId: number;
};

export type ProfileReducerStateType = {
  posts: PostsType[];
  profile: NullableType<ProfileType>;
  isOwner: boolean;
  status: string;
};

type AddPostActionType = ReturnType<typeof addPost>;
type SetUserProfileActionType = ReturnType<typeof setUserProfile>;
type SetStatusActionType = ReturnType<typeof setStatus>;
type DeletePostActionType = ReturnType<typeof deletePost>;
type SetPhotoSuccessActionType = ReturnType<typeof setPhotoSuccess>;
export type ProfileReducerActionsType =
  | AddPostActionType
  | SetUserProfileActionType
  | SetStatusActionType
  | DeletePostActionType
  | SetPhotoSuccessActionType;
export type SaveProfileThunkType = ThunkAction<
  Promise<any>,
  RootStateType,
  unknown,
  FormAction
>;
