import React, { ComponentType } from 'react';

import { Button } from 'components/common/button/Button';
import {
  createField,
  Input,
  Textarea,
} from 'components/common/formsControls/FormsControls';
import inputErrorStyle from 'components/common/formsControls/formsControls.module.scss';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { ProfileType } from 'store/reducers/profileReducer/types';

import styles from './profileInfo.module.scss';

export type ProfileDataFormPropsType = {
  profile: ProfileType;
};

const ProfileDataForm: ComponentType<
  ProfileDataFormPropsType & InjectedFormProps<ProfileType, ProfileDataFormPropsType>
> = ({ handleSubmit, profile, error }) => {
  return (
    <form className={styles.editFormContainer} onSubmit={handleSubmit}>
      <div>
        <div>
          <Button className={styles.button} type='submit'>
            Save info
          </Button>
        </div>
        {error && <div className={inputErrorStyle.formSummaryError}>{error}</div>}
        <div className={styles.userInfoText}>
          <span className={styles.userInfoText}>Full name: </span>
          {createField(
            'Full name',
            'fullName',
            [],
            Input,
            {},
            '',
            '',
            styles.editModeInput,
          )}
        </div>
        <div className={styles.flexContainer}>
          <span className={styles.userInfoText}>Looking for a job: </span>
          <div className={styles.editModeInput}>
            {createField(
              '',
              'lookingForAJob',
              [],
              Input,
              { type: 'checkbox' },
              '',
              '',
              '',
            )}
          </div>
        </div>
        <div>
          <span className={styles.userInfoText}>Skills: </span>
          {createField(
            'Skills',
            'lookingForAJobDescription',
            [],
            Textarea,
            {},
            '',
            '',
            styles.editModeInput,
          )}
        </div>
        <div>
          <span className={styles.userInfoText}>About me: </span>
          {createField(
            'About me',
            'aboutMe',
            [],
            Textarea,
            {},
            '',
            '',
            styles.editModeInput,
          )}
        </div>
      </div>
      <div>
        <span className={styles.editModeContacts}>Contacts</span>

        {Object.keys(profile.contacts).map((key) => {
          return (
            <div key={key}>
              <span className={styles.userInfoText}>{key}</span>
              <span>{': '}</span>
              {createField(
                key,
                `contacts.${key}`,
                [],
                Input,
                {},
                '',
                '',
                styles.editModeInput,
              )}
            </div>
          );
        })}
      </div>
    </form>
  );
};

export const ProfileDataFormReduxForm = reduxForm<ProfileType, ProfileDataFormPropsType>({
  form: 'edit-profile',
})(ProfileDataForm);
