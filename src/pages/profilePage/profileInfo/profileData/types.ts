import { ProfileType } from 'store/reducers/profileReducer/types';

export type ProfileDataPropsType = {
  profile: ProfileType;
  isOwner: boolean;
  enableEditMode: () => void;
};
