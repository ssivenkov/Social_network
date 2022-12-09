import {
  REQUIRED_CAPTCHA_RESULT_CODE,
  SUCCESS_RESULT_CODE,
} from 'constants/resultCodeConstants';

import { AuthAPI, ProfileAPI, SecurityAPI } from 'api/API';
import { AUTH_REDUCER_ACTION } from 'enum/authReducerEnum';
import { FormAction, stopSubmit } from 'redux-form';
import { ThunkDispatch } from 'redux-thunk';
import { RootStateType } from 'store/types';
import { NullableType } from 'types/nullableType';

import { AuthReducerActionsType, AuthReducerStateType } from './types';

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
  profileSmallPhoto: null,
};

export const authReducer = (
  state: AuthReducerStateType = initialState,
  action: AuthReducerActionsType,
): AuthReducerStateType => {
  switch (action.type) {
    case AUTH_REDUCER_ACTION.SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case AUTH_REDUCER_ACTION.GET_CAPTCHA_URL_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case AUTH_REDUCER_ACTION.SET_PROFILE_SMALL_PHOTO: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export const setAuthUserData = (
  userId: NullableType<number>,
  email: NullableType<string>,
  login: NullableType<string>,
  isAuth: boolean,
) =>
  ({
    type: AUTH_REDUCER_ACTION.SET_USER_DATA,
    payload: { userId, email, login, isAuth },
  } as const);

export const getCaptchaUrlSuccess = (captchaUrl: string) =>
  ({
    type: AUTH_REDUCER_ACTION.GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl },
  } as const);

export const setProfileSmallPhotoSuccess = (profileSmallPhoto: NullableType<string>) =>
  ({
    type: AUTH_REDUCER_ACTION.SET_PROFILE_SMALL_PHOTO,
    payload: { profileSmallPhoto },
  } as const);

export const getAuthUserData = () => {
  return async (
    dispatch: ThunkDispatch<RootStateType, unknown, AuthReducerActionsType>,
  ) => {
    try {
      const response = await AuthAPI.me();

      if (response.resultCode === SUCCESS_RESULT_CODE) {
        const { id, email, login } = response.data;

        dispatch(setAuthUserData(id, email, login, true));
      }
    } catch (error) {
      console.log(`Error getting auth user data. ${error}`);
    }
  };
};

export const setProfileSmallPhoto = (userId: NullableType<number>) => {
  return async (
    dispatch: ThunkDispatch<RootStateType, unknown, AuthReducerActionsType>,
  ) => {
    try {
      if (userId) {
        const response = await ProfileAPI.getProfileSmallPhoto(userId);

        dispatch(setProfileSmallPhotoSuccess(response));
      }
    } catch (error) {
      console.log(`Error setting profile small photo. ${error}`);
    }
  };
};

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string,
) => {
  return async (dispatch: ThunkDispatch<RootStateType, unknown, FormAction>) => {
    try {
      const response = await AuthAPI.login(email, password, rememberMe, captcha);

      if (response.resultCode === SUCCESS_RESULT_CODE) {
        await dispatch(getAuthUserData());
      } else {
        if (response.resultCode === REQUIRED_CAPTCHA_RESULT_CODE) {
          await dispatch(getCaptchaUrl());
        } else {
          const message =
            response.messages.length > 0
              ? response.messages[0]
              : 'Some error. Please reload page';

          dispatch(stopSubmit('login', { _error: message }));
        }
      }
    } catch (error) {
      console.log(`Error login. ${error}`);
    }
  };
};

export const getCaptchaUrl = () => {
  return async (
    dispatch: ThunkDispatch<RootStateType, unknown, AuthReducerActionsType>,
  ) => {
    try {
      const response = await SecurityAPI.getCaptchaUrl();
      const captchaUrl = response.url;

      dispatch(getCaptchaUrlSuccess(captchaUrl));
    } catch (error) {
      console.log(`Error getting captcha image url. ${error}`);
    }
  };
};

export const logout = () => {
  return async (
    dispatch: ThunkDispatch<RootStateType, unknown, AuthReducerActionsType>,
  ) => {
    try {
      const response = await AuthAPI.logout();

      if (response.resultCode === SUCCESS_RESULT_CODE) {
        dispatch(setProfileSmallPhoto(null));
        dispatch(setAuthUserData(null, null, null, false));
      }
    } catch (error) {
      console.log(`Error logout. ${error}`);
    }
  };
};
