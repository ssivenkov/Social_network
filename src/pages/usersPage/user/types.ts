import { UserType } from 'store/reducers/usersReducer/types';
import { NullableType } from 'types/nullableType';

export type UserPropsType = {
  user: UserType;
  follow: (userId: number) => void;
  unFollow: (userId: number) => void;
  followingInProgress: number[];
  isOwner: NullableType<number>;
};
