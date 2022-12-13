import React, { ChangeEvent, useState } from 'react';

import profileBackground from 'assets/images/profileBackground.jpg';
import AnonymousUserPhoto from 'assets/images/user.png';
import { Preloader } from 'components/common/preloader/Preloader';
import { ProfileType } from 'store/reducers/profileReducer/types';

import { ProfileData } from './profileData/ProfileData';
import { ProfileDataFormReduxForm } from './ProfileDataForm';
import styles from './profileInfo.module.scss';
import { ProfileStatus } from './profileStatus/ProfileStatus';
import { ProfileInfoPropsType } from './types';

export const ProfileInfo = (props: ProfileInfoPropsType) => {
  const { profile, isOwner, status, updateStatus, savePhoto, saveProfile } = props;

  const [editMode, setEditMode] = useState<boolean>(false);

  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length === 1) {
      savePhoto(event.target.files[0]);
    }
  };

  const onSubmit = (profile: ProfileType) => {
    saveProfile(profile).then(() => {
      setEditMode(false);
    });
  };

  return (
    <div>
      <div>
        <img
          alt='Background'
          className={styles.backgroundImage}
          src={profileBackground}
        />
      </div>
      <div className={styles.userInfoSection}>
        <div className={styles.userAvatarSection}>
          <img
            alt={profile.fullName + ' user avatar'}
            className={styles.userAvatar}
            src={profile.photos.large || AnonymousUserPhoto}
          />
          {isOwner && (
            <div className={styles.inputFileButtonContainer}>
              <input
                className={styles.inputFile}
                id='file'
                name='file'
                onChange={onMainPhotoSelected}
                type='file'
              />
              <label htmlFor='file'>Change avatar</label>
            </div>
          )}
        </div>
        <div className={styles.editModeContainer}>
          <div className={styles.statusContainer}>
            <ProfileStatus
              isOwner={isOwner}
              status={status}
              updateStatus={updateStatus}
            />
          </div>
          {editMode ? (
            <ProfileDataFormReduxForm
              initialValues={profile}
              onSubmit={onSubmit}
              profile={profile}
            />
          ) : (
            <ProfileData
              enableEditMode={() => setEditMode(true)}
              isOwner={isOwner}
              profile={profile}
            />
          )}
        </div>
      </div>
    </div>
  );
};
