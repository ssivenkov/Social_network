import { SUCCESS_RESULT_CODE } from 'constants/resultCodeConstants';

import { UsersAPI } from 'api/API';
import { USERS_REDUCER_ACTION } from 'enum/usersReducerEnum';
import { ThunkDispatch } from 'redux-thunk';
import { RootStateType } from 'store/types';

import { UsersReducerActionsType, UsersReducerStateType, UserType } from './types';

const initialState = {
  users: [],
  pageSize: 20,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
  isOwner: null, // not use, need for TS
};

export const usersReducer = (
  state: UsersReducerStateType = initialState,
  action: UsersReducerActionsType,
): UsersReducerStateType => {
  switch (action.type) {
    case USERS_REDUCER_ACTION.FOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: true };
          } else return user;
        }),
      };
    case USERS_REDUCER_ACTION.UNFOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: false };
          } else return user;
        }),
      };
    case USERS_REDUCER_ACTION.SET_USERS: {
      return { ...state, users: [...action.users] };
    }
    case USERS_REDUCER_ACTION.SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.currentPage };
    }
    case USERS_REDUCER_ACTION.SET_TOTAL_USERS_COUNT: {
      return { ...state, totalUsersCount: action.count };
    }
    case USERS_REDUCER_ACTION.TOGGLE_IS_FETCHING: {
      return { ...state, isFetching: action.isFetching };
    }
    case USERS_REDUCER_ACTION.FOLLOWING_IN_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    }
    default:
      return state;
  }
};

export const followSuccess = (userId: number) =>
  ({ type: USERS_REDUCER_ACTION.FOLLOW, userId } as const);

export const unFollowSuccess = (userId: number) =>
  ({ type: USERS_REDUCER_ACTION.UNFOLLOW, userId } as const);

export const setUsers = (users: UserType[]) =>
  ({ type: USERS_REDUCER_ACTION.SET_USERS, users } as const);

export const setCurrentPage = (currentPage: number) =>
  ({ type: USERS_REDUCER_ACTION.SET_CURRENT_PAGE, currentPage } as const);

export const setTotalUsersCount = (totalUsersCount: number) =>
  ({ type: USERS_REDUCER_ACTION.SET_TOTAL_USERS_COUNT, count: totalUsersCount } as const);

export const toggleIsFetching = (isFetching: boolean) =>
  ({ type: USERS_REDUCER_ACTION.TOGGLE_IS_FETCHING, isFetching } as const);

export const toggleFollowingProgress = (isFetching: boolean, userId: number) =>
  ({ type: USERS_REDUCER_ACTION.FOLLOWING_IN_PROGRESS, isFetching, userId } as const);

export const getUsers = (page: number, pageSize: number) => {
  return async (
    dispatch: ThunkDispatch<RootStateType, unknown, UsersReducerActionsType>,
  ) => {
    try {
      dispatch(toggleIsFetching(true));
      dispatch(setCurrentPage(page));
      const response = await UsersAPI.getUsers(page, pageSize);

      dispatch(toggleIsFetching(false));
      dispatch(setUsers(response.items));
      dispatch(setTotalUsersCount(response.totalCount));
    } catch (error) {
      console.log(`Error getting users. ${error}`);
    }
  };
};

export const follow = (userId: number) => {
  return async (
    dispatch: ThunkDispatch<RootStateType, unknown, UsersReducerActionsType>,
  ) => {
    try {
      dispatch(toggleFollowingProgress(true, userId));
      const response = await UsersAPI.follow(userId);

      if (response.resultCode === SUCCESS_RESULT_CODE) {
        dispatch(followSuccess(userId));
      }
      dispatch(toggleFollowingProgress(false, userId));
    } catch (error) {
      console.log(`Error following. ${error}`);
    }
  };
};

export const unFollow = (userId: number) => {
  return async (
    dispatch: ThunkDispatch<RootStateType, unknown, UsersReducerActionsType>,
  ) => {
    try {
      dispatch(toggleFollowingProgress(true, userId));
      const response = await UsersAPI.unFollow(userId);

      if (response.resultCode === SUCCESS_RESULT_CODE) {
        dispatch(unFollowSuccess(userId));
      }
      dispatch(toggleFollowingProgress(false, userId));
    } catch (error) {
      console.log(`Error unfollowing. ${error}`);
    }
  };
};
