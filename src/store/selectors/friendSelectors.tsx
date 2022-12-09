import { createSelector } from 'reselect';
import { FriendType } from 'store/reducers/friendsReducer/types';
import { RootStateType } from 'store/types';

const getFriends = (state: RootStateType) => {
  return state.friendsPage.friends;
};

export const getFriendsSelector = createSelector(getFriends, (friends: FriendType[]) => {
  return friends.filter((friend) => friend);
});

export const getPageSizeSelector = (state: RootStateType) => {
  return state.friendsPage.pageSize;
};

export const getTotalFriendsCountSelector = (state: RootStateType) => {
  return state.friendsPage.totalFriendsCount;
};

export const getCurrentPageSelector = (state: RootStateType) => {
  return state.friendsPage.currentPage;
};

export const getIsFetchingSelector = (state: RootStateType) => {
  return state.friendsPage.isFetching;
};

export const getFollowingInProgressSelector = (state: RootStateType) => {
  return state.friendsPage.followingInProgress;
};
