import { INPUT_MAX_LENGTH } from 'constants/common';

import React from 'react';

import { Button } from 'components/common/button/Button';
import { createField, Textarea } from 'components/common/formsControls/FormsControls';
import { maxLengthCreator, required } from 'helpers/validations';
import { InjectedFormProps, reduxForm } from 'redux-form';

import styles from '../myPosts.module.scss';

import { AddPostFormDataType, AddPostFormPropsType } from './types';

const maxLength = maxLengthCreator(INPUT_MAX_LENGTH);

const AddPostForm = (
  props: InjectedFormProps<AddPostFormDataType, AddPostFormPropsType> &
    AddPostFormPropsType,
) => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      {createField(
        'Write your post',
        'newPostText',
        [required, maxLength],
        Textarea,
        {},
        '',
        '',
        styles.newPostCreateField,
      )}
      <div>
        <Button className={styles.addPostButton} type='submit'>
          Add post
        </Button>
      </div>
    </form>
  );
};

export default reduxForm<AddPostFormDataType, object>({ form: 'add-new-profile-post' })(
  AddPostForm,
);
