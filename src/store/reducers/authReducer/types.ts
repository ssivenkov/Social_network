import { NullableType } from 'types/nullableType';

import {
  getCaptchaUrlSuccess,
  setAuthUserData,
  setProfileSmallPhotoSuccess,
} from './authReducer';

export type AuthReducerStateType = {
  userId: NullableType<number>;
  email: NullableType<string>;
  login: NullableType<string>;
  isAuth: boolean;
  captchaUrl: NullableType<string>;
  profileSmallPhoto: NullableType<string>;
};

type SetUserDataActionType = ReturnType<typeof setAuthUserData>;
type GetCaptchaUrlSuccessType = ReturnType<typeof getCaptchaUrlSuccess>;
type SetProfilePhotoType = ReturnType<typeof setProfileSmallPhotoSuccess>;

export type AuthReducerActionsType =
  | SetUserDataActionType
  | GetCaptchaUrlSuccessType
  | SetProfilePhotoType;
