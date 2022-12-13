import { SUCCESS_RESULT_CODE } from 'constants/resultCodeConstants';

import { UsersAPI } from 'api/API';
import { FRIENDS_REDUCER_ACTION } from 'enum/friendsReducerEnum';
import { ThunkDispatch } from 'redux-thunk';
import { RootStateType } from 'store/types';

import { FriendsReducerActionsType, FriendsReducerStateType, FriendType } from './types';

const initialState = {
  friends: [],
  pageSize: 20,
  totalFriendsCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
  isOwner: null, // not use, need for TS
};

export const friendsReducer = (
  state: FriendsReducerStateType = initialState,
  action: FriendsReducerActionsType,
): FriendsReducerStateType => {
  switch (action.type) {
    case FRIENDS_REDUCER_ACTION.FOLLOW:
      return {
        ...state,
        friends: state.friends.map((friend) => {
          if (friend.id === action.friendId) {
            return { ...friend, followed: true };
          } else return friend;
        }),
      };
    case FRIENDS_REDUCER_ACTION.UNFOLLOW:
      return {
        ...state,
        friends: state.friends.map((friend) => {
          if (friend.id === action.friendId) {
            return { ...friend, followed: false };
          } else return friend;
        }),
      };
    case FRIENDS_REDUCER_ACTION.SET_FRIENDS: {
      return { ...state, friends: [...action.friends] };
    }
    case FRIENDS_REDUCER_ACTION.SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.currentPage };
    }
    case FRIENDS_REDUCER_ACTION.SET_TOTAL_FRIENDS_COUNT: {
      return { ...state, totalFriendsCount: action.count };
    }
    case FRIENDS_REDUCER_ACTION.TOGGLE_IS_FETCHING: {
      return { ...state, isFetching: action.isFetching };
    }
    case FRIENDS_REDUCER_ACTION.FOLLOWING_IN_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.friendId]
          : state.followingInProgress.filter((id) => id !== action.friendId),
      };
    }
    default:
      return state;
  }
};

export const followSuccess = (friendId: number) =>
  ({ type: FRIENDS_REDUCER_ACTION.FOLLOW, friendId } as const);

export const unFollowSuccess = (friendId: number) =>
  ({ type: FRIENDS_REDUCER_ACTION.UNFOLLOW, friendId } as const);

export const setFriends = (friends: FriendType[]) =>
  ({ type: FRIENDS_REDUCER_ACTION.SET_FRIENDS, friends } as const);

export const setCurrentPage = (currentPage: number) =>
  ({ type: FRIENDS_REDUCER_ACTION.SET_CURRENT_PAGE, currentPage } as const);

export const setTotalFriendsCount = (totalFriendsCount: number) =>
  ({
    type: FRIENDS_REDUCER_ACTION.SET_TOTAL_FRIENDS_COUNT,
    count: totalFriendsCount,
  } as const);

export const toggleIsFetching = (isFetching: boolean) =>
  ({ type: FRIENDS_REDUCER_ACTION.TOGGLE_IS_FETCHING, isFetching } as const);

export const toggleFollowingProgress = (isFetching: boolean, friendId: number) =>
  ({ type: FRIENDS_REDUCER_ACTION.FOLLOWING_IN_PROGRESS, isFetching, friendId } as const);

export const getFriends = (page: number, pageSize: number) => {
  return async (
    dispatch: ThunkDispatch<RootStateType, unknown, FriendsReducerActionsType>,
  ) => {
    try {
      dispatch(toggleIsFetching(true));
      dispatch(setCurrentPage(page));
      const response = await UsersAPI.getFriends(page, pageSize);

      dispatch(toggleIsFetching(false));
      dispatch(setFriends(response.items));
      dispatch(setTotalFriendsCount(response.totalCount));
    } catch (error) {
      console.log(`Error getting friends. ${error}`);
    }
  };
};

export const follow = (friendId: number) => {
  return async (
    dispatch: ThunkDispatch<RootStateType, unknown, FriendsReducerActionsType>,
  ) => {
    try {
      dispatch(toggleFollowingProgress(true, friendId));
      const response = await UsersAPI.follow(friendId);

      if (response.resultCode === SUCCESS_RESULT_CODE) {
        dispatch(followSuccess(friendId));
      }
      dispatch(toggleFollowingProgress(false, friendId));
    } catch (error) {
      console.log(`Error following. ${error}`);
    }
  };
};

export const unFollow = (friendId: number) => {
  return async (
    dispatch: ThunkDispatch<RootStateType, unknown, FriendsReducerActionsType>,
  ) => {
    try {
      dispatch(toggleFollowingProgress(true, friendId));
      const response = await UsersAPI.unFollow(friendId);

      if (response.resultCode === SUCCESS_RESULT_CODE) {
        dispatch(unFollowSuccess(friendId));
      }
      dispatch(toggleFollowingProgress(false, friendId));
    } catch (error) {
      console.log(`Error unfollowing. ${error}`);
    }
  };
};
