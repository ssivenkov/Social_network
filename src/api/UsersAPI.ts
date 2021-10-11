import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {"API-KEY": "34c4f502-d7f5-47ba-9bb6-a6e835a2121e"},
});

export const usersAPI = {
    getAuth() {
        return instance.get(`auth/me`,
            {withCredentials: true, headers: {"API-KEY": "34c4f502-d7f5-47ba-9bb6-a6e835a2121e"}})
            .then(response => response.data)
    },

    getUsers(currentPage = 1, pageSize = 1) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    getProfile(userId: number) {
        return instance.get(`profile/${userId}`)
            .then(response => response.data)
    },

    follow(userId: number) {
        return instance.post(`follow/${userId}`, {})
            .then(response => response.data)
    },

    unFollow(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    },
}