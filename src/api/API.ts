import axios from 'axios';
import { ProfileType } from 'store/reducers/profileReducer/types';

import {
  FollowResponseType,
  GetProfileResponseType,
  GetUsersResponseType,
} from './types';

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: `${process.env.REACT_APP_DATA_BASE_URL}`,
  headers: { 'API-KEY': `${process.env.REACT_APP_API_KEY}` },
});

export const UsersAPI = {
  getUsers(currentPage = 1, pageSize = 1) {
    return axiosInstance
      .get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },

  getFriends(currentPage = 1, pageSize = 1) {
    return axiosInstance
      .get<GetUsersResponseType>(
        `users?page=${currentPage}&count=${pageSize}&friend=true`,
      )
      .then((response) => response.data);
  },

  getProfile(userId: number) {
    return ProfileAPI.getProfile(userId);
  },

  follow(userId: number) {
    return axiosInstance
      .post<FollowResponseType>(`follow/${userId}`, {})
      .then((response) => response.data);
  },

  unFollow(userId: number) {
    return axiosInstance
      .delete<FollowResponseType>(`follow/${userId}`)
      .then((response) => response.data);
  },
};

export const ProfileAPI = {
  getProfile(userId: number) {
    return axiosInstance
      .get<GetProfileResponseType>(`profile/${userId}`)
      .then((response) => response.data);
  },
  getProfileSmallPhoto(userId: number) {
    return axiosInstance
      .get<GetProfileResponseType>(`profile/${userId}`)
      .then((response) => response.data.photos.small);
  },
  getStatus(userId: number) {
    return axiosInstance
      .get('profile/status/' + userId)
      .then((response) => response.data);
  },
  updateStatus(status: string) {
    return axiosInstance
      .put('profile/status/', { status: status })
      .then((response) => response.data);
  },
  savePhoto(photoFile: File) {
    const formData = new FormData();

    formData.append('image', photoFile);

    return axiosInstance
      .put('profile/photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data);
  },
  saveProfile(profile: ProfileType) {
    return axiosInstance.put('profile', profile).then((response) => response.data);
  },
};

export const AuthAPI = {
  me() {
    return axiosInstance.get('auth/me').then((response) => response.data);
  },
  login(email: string, password: string, rememberMe = false, captcha: null | string) {
    return axiosInstance
      .post('auth/login', { email, password, rememberMe, captcha })
      .then((response) => response.data);
  },
  logout() {
    return axiosInstance.delete('auth/login').then((response) => response.data);
  },
};

export const SecurityAPI = {
  getCaptchaUrl() {
    return axiosInstance
      .get('security/get-captcha-url')
      .then((response) => response.data);
  },
};
