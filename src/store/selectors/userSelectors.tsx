import { createSelector } from 'reselect';
import { UserType } from 'store/reducers/usersReducer/types';
import { RootStateType } from 'store/types';

const getUsers = (state: RootStateType) => {
  return state.usersPage.users;
};

export const getUsersSelector = createSelector(getUsers, (users: UserType[]) => {
  return users.filter((user) => user);
});

export const getPageSizeSelector = (state: RootStateType) => {
  return state.usersPage.pageSize;
};

export const getTotalUsersCountSelector = (state: RootStateType) => {
  return state.usersPage.totalUsersCount;
};

export const getCurrentPageSelector = (state: RootStateType) => {
  return state.usersPage.currentPage;
};

export const getIsFetchingSelector = (state: RootStateType) => {
  return state.usersPage.isFetching;
};

export const getFollowingInProgressSelector = (state: RootStateType) => {
  return state.usersPage.followingInProgress;
};
