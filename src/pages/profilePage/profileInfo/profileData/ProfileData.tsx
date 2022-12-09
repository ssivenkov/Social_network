import React from 'react';

import { Button } from 'components/common/button/Button';
import { Contact } from 'pages/profilePage/profileInfo/profileData/contact/Contact';
import { ProfileContacts } from 'store/reducers/profileReducer/types';

import styles from '../profileInfo.module.scss';

import { ProfileDataPropsType } from './types';

export const ProfileData = (props: ProfileDataPropsType) => {
  const { profile, isOwner, enableEditMode } = props;

  return (
    <div className={styles.userDescription}>
      {isOwner && (
        <div>
          <Button className={styles.button} onClick={enableEditMode}>
            Edit info
          </Button>
        </div>
      )}
      <div className={styles.userName}>
        {profile.fullName ? profile.fullName : 'information is absent'}
      </div>
      <div className={styles.userInfoText}>
        {'Looking for a job: '}
        {profile.lookingForAJob ? 'yes' : 'no'}
      </div>
      {profile.lookingForAJobDescription && (
        <div className={styles.userInfoText}>
          Skills:
          {profile.lookingForAJobDescription}
        </div>
      )}
      {profile.aboutMe && (
        <div className={styles.userInfoText}>
          About me:
          {profile.aboutMe}
        </div>
      )}
      {
        /* if there is at least 1 filled contact then perform the render */
        !Object.keys(profile.contacts)
          .map((key) => {
            return profile.contacts[key as keyof ProfileContacts];
          })
          .every((el) => el === null) && (
          <div>
            <span className={styles.contactsSection}>Contacts: </span>
            {Object.keys(profile.contacts).map((key) => {
              return profile.contacts[key as keyof ProfileContacts] ? (
                <Contact
                  contactTitle={key}
                  contactValue={profile.contacts[key as keyof ProfileContacts]}
                  key={key}
                />
              ) : null;
            })}
          </div>
        )
      }
    </div>
  );
};
