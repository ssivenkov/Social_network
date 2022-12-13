import { FriendType } from 'store/reducers/friendsReducer/types';
import { NullableType } from 'types/nullableType';

export type MapStateToPropsType = {
  friends: FriendType[];
  pageSize: number;
  totalFriendsCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: number[];
  isOwner: NullableType<number>;
};

export type MapDispatchToPropsType = {
  follow: (friendId: number) => void;
  unFollow: (friendId: number) => void;
  setCurrentPage: (pageNumber: number) => void;
  getFriends: (page: number, pageSize: number) => void;
};

export type FriendsContainerPropsType = MapStateToPropsType & MapDispatchToPropsType;

export type FriendsPropsType = {
  totalFriendsCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (pageNumber: number) => void;
  friends: FriendType[];
  follow: (friendId: number) => void;
  unFollow: (friendId: number) => void;
  followingInProgress: number[];
  isOwner: NullableType<number>;
};
