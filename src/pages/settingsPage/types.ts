import { NullableType } from 'types/nullableType';

export type MapStateToPropsType = {
  isOwner: NullableType<number>;
};

export type MapDispatchToPropsType = {
  logout: () => void;
};

export type SettingsPropsType = {
  isOwner: NullableType<number>;
  logout: () => void;
};

export type SettingsContainerPropsType = MapStateToPropsType & MapDispatchToPropsType;
