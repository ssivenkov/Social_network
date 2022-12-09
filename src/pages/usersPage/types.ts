import { UserType } from 'store/reducers/usersReducer/types';
import { NullableType } from 'types/nullableType';

export type MapStateToPropsType = {
  users: UserType[];
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: number[];
  isOwner: NullableType<number>;
};

export type MapDispatchToPropsType = {
  follow: (userId: number) => void;
  unFollow: (userId: number) => void;
  setCurrentPage: (pageNumber: number) => void;
  getUsers: (page: number, pageSize: number) => void;
};

export type UsersPropsType = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (pageNumber: number) => void;
  users: UserType[];
  follow: (userId: number) => void;
  unFollow: (userId: number) => void;
  followingInProgress: number[];
  isOwner: NullableType<number>;
};

export type UsersContainerPropsType = MapStateToPropsType & MapDispatchToPropsType;
