import React from "react";
import { RootStateType } from "../reduxStore";

export const getUsersSelector = (state: RootStateType) => {
    return state.usersPage.users;
}

export const getPageSizeSelector = (state: RootStateType) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCountSelector = (state: RootStateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPageSelector = (state: RootStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetchingSelector = (state: RootStateType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgressSelector = (state: RootStateType) => {
    return state.usersPage.followingInProgress
}