import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: ***REMOVED***,
    headers: {"API-KEY": ***REMOVED***},
});

export const usersAPI = {
    getAuth() {
        return instance.get(`auth/me`,
            {withCredentials: true, headers: {"API-KEY": ***REMOVED***}})
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