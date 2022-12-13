import { ProfileType } from 'store/reducers/profileReducer/types';
import { UserType } from 'store/reducers/usersReducer/types';
import { NullableType } from 'types/nullableType';

export type GetUsersResponseType = {
  error: NullableType<any>;
  items: UserType[];
  totalCount: number;
};

export type GetProfileResponseType = ProfileType;

export type FollowResponseType = {
  /*data: {};*/
  fieldsErrors: any[];
  messages: any[];
  resultCode: number;
};
