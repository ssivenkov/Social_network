import { NullableType } from 'types/nullableType';

import {
  followSuccess,
  setCurrentPage,
  setTotalUsersCount,
  setUsers,
  toggleFollowingProgress,
  toggleIsFetching,
  unFollowSuccess,
} from './usersReducer';

export type UserType = {
  followed: boolean;
  id: number;
  name: string;
  photos: {
    small: string | null | undefined;
    large: string | null | undefined;
  };
  status: NullableType<string>;
  uniqueUrlName: NullableType<string>;
};

export type UsersReducerStateType = {
  users: UserType[];
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: number[];
  isOwner: NullableType<number>;
};

type FollowActionType = ReturnType<typeof followSuccess>;
type UnFollowActionType = ReturnType<typeof unFollowSuccess>;
type SetUsersActionType = ReturnType<typeof setUsers>;
type SetCurrentPageActionType = ReturnType<typeof setCurrentPage>;
type SetTotalUsersCountActionType = ReturnType<typeof setTotalUsersCount>;
type ToggleIsFetchingActionType = ReturnType<typeof toggleIsFetching>;
type FollowingInProgressActionType = ReturnType<typeof toggleFollowingProgress>;

export type UsersReducerActionsType =
  | FollowActionType
  | UnFollowActionType
  | SetUsersActionType
  | SetCurrentPageActionType
  | SetTotalUsersCountActionType
  | ToggleIsFetchingActionType
  | FollowingInProgressActionType;
