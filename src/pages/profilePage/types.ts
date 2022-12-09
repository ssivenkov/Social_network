import { RouteComponentProps } from 'react-router-dom';
import { ProfileType } from 'store/reducers/profileReducer/types';
import { NullableType } from 'types/nullableType';

export type MapStateToPropsType = {
  profile: null | ProfileType;
  isOwner: boolean;
  currentUser: any;
  status: string;
  authorizedUserId: NullableType<number>;
  isAuth: boolean;
};

export type MapDispatchToPropsType = {
  getUserProfile: (userId: number) => void;
  getStatus: (userId: number) => void;
  updateStatus: (status: string) => void;
  savePhoto: (photoFile: File) => void;
  saveProfile: (profile: ProfileType) => any;
};

type MatchParamsType = {
  userId: string;
};

export type ProfilePropsType = RouteComponentProps<MatchParamsType> &
  MapStateToPropsType &
  MapDispatchToPropsType;
