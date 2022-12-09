import { FriendsType } from 'store/reducers/sidebarFriendsReducer/type';

export type MapDispatchToPropsType = object;

export type MapStateToPropsType = {
  friends: FriendsType[];
};

export type NavigationBarPropsType = MapStateToPropsType & MapDispatchToPropsType;
