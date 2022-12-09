import { ProfileType } from 'store/reducers/profileReducer/types';

export type ProfileInfoPropsType = {
  profile: null | ProfileType;
  isOwner: boolean;
  status: string;
  updateStatus: (status: string) => void;
  savePhoto: (photoFile: File) => void;
  saveProfile: (profile: ProfileType) => any;
};
