import React from 'react';

import { MyPostsContainer } from './myPosts/MyPostsContainer';
import { ProfileInfo } from './profileInfo/ProfileInfo';
import { ProfilePropsType } from './types';

export const Profile = (props: ProfilePropsType) => {
  const { profile, isOwner, status, updateStatus, savePhoto, saveProfile } = props;

  return (
    <div>
      <ProfileInfo
        isOwner={isOwner}
        profile={profile}
        savePhoto={savePhoto}
        saveProfile={saveProfile}
        status={status}
        updateStatus={updateStatus}
      />
      <MyPostsContainer isOwner={isOwner} userAvatar={profile?.photos.small} />
    </div>
  );
};
