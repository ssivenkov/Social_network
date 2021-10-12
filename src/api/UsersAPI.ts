import axios from "axios";
import { UserType } from "../redux/reducers/usersReducer";
import { ProfileType } from "../redux/reducers/profileReducer";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {"API-KEY": "34c4f502-d7f5-47ba-9bb6-a6e835a2121e"},
});

type GetUsersResponseType = {
    error: null | any
    items: Array<UserType>
    totalCount: number
}

type GetProfileResponseType = ProfileType

type FollowResponseType = {
    data: any
    fieldsErrors: Array<any>
    messages: Array<any>
    resultCode: number
}

export const UsersAPI = {
    getUsers(currentPage = 1, pageSize = 1) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    getProfile(userId: number) {
        return instance.get<GetProfileResponseType>(`profile/${userId}`)
            .then(response => response.data)
    },

    follow(userId: number) {
        return instance.post<FollowResponseType>(`follow/${userId}`, {})
            .then(response => response.data)
    },

    unFollow(userId: number) {
        return instance.delete<FollowResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
            .then(response => response.data)
    },
}