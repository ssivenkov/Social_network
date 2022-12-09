import { NullableType } from 'types/nullableType';

import {
  followSuccess,
  setCurrentPage,
  setFriends,
  setTotalFriendsCount,
  toggleFollowingProgress,
  toggleIsFetching,
  unFollowSuccess,
} from './friendsReducer';

export type FriendType = {
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

export type FriendsReducerStateType = {
  friends: FriendType[];
  pageSize: number;
  totalFriendsCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: number[];
  isOwner: NullableType<number>;
};

type FollowActionType = ReturnType<typeof followSuccess>;
type UnFollowActionType = ReturnType<typeof unFollowSuccess>;
type SetFriendsActionType = ReturnType<typeof setFriends>;
type SetCurrentPageActionType = ReturnType<typeof setCurrentPage>;
type SetTotalFriendsCountActionType = ReturnType<typeof setTotalFriendsCount>;
type ToggleIsFetchingActionType = ReturnType<typeof toggleIsFetching>;
type FollowingInProgressActionType = ReturnType<typeof toggleFollowingProgress>;

export type FriendsReducerActionsType =
  | FollowActionType
  | UnFollowActionType
  | SetFriendsActionType
  | SetCurrentPageActionType
  | SetTotalFriendsCountActionType
  | ToggleIsFetchingActionType
  | FollowingInProgressActionType;
