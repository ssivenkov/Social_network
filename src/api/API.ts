import axios from "axios";
import { UserType } from "../redux/reducers/usersReducer";
import { ProfileType } from "../redux/reducers/profileReducer";

const instance = axios.create({
    withCredentials: true,
    baseURL: ***REMOVED***,
    headers: {"API-KEY": ***REMOVED***},
});

type GetUsersResponseType = {
    error: null | any
    items: Array<UserType>
    totalCount: number
}

type GetProfileResponseType = ProfileType

type FollowResponseType = {
    data: {}
    fieldsErrors: Array<any>
    messages: Array<any>
    resultCode: number
}

export const UsersAPI = {
    getUsers(currentPage = 1, pageSize = 1) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },

    getProfile(userId: number) {
        console.warn("Obsolete method. Please use ProfileAPI object");
        return ProfileAPI.getProfile(userId);
    },

    follow(userId: number) {
        return instance.post<FollowResponseType>(`follow/${userId}`, {})
            .then(response => response.data);
    },

    unFollow(userId: number) {
        return instance.delete<FollowResponseType>(`follow/${userId}`)
            .then(response => response.data);
    },
}

export const ProfileAPI = {
    getProfile(userId: number) {
        return instance.get<GetProfileResponseType>(`profile/${userId}`)
            .then(response => response.data);
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/` + userId)
            .then(response => response.data);
    },
    updateStatus(status: string) {
        return instance.put(`profile/status/`, {status: status})
            .then(response => response.data);
    },
}

export const AuthAPI = {
    me() {
        return instance.get(`auth/me`)
            .then(response => response.data);
    },
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post(`auth/login`, {email, password, rememberMe})
            .then(response => response.data);
    },
    logout() {
        return instance.delete(`auth/login`)
            .then(response => response.data);
    },
}