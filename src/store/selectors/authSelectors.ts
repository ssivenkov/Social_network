import { RootStateType } from 'store/types';

export const isAuthSelector = (state: RootStateType) => {
  return state.auth.isAuth;
};

export const loginSelector = (state: RootStateType) => {
  return state.auth.login;
};

export const userIDSelector = (state: RootStateType) => {
  return state.auth.userId;
};

export const profileSmallPhotoSelector = (state: RootStateType) => {
  return state.auth.profileSmallPhoto;
};
