import { FriendType } from 'store/reducers/friendsReducer/types';
import { NullableType } from 'types/nullableType';

export type FriendPropsType = {
  friend: FriendType;
  follow: (friendId: number) => void;
  unFollow: (friendId: number) => void;
  followingInProgress: number[];
  isOwner: NullableType<number>;
};
