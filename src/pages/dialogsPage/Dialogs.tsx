import { INPUT_MAX_LENGTH } from 'constants/common';

import React from 'react';

import { Button } from 'components/common/button/Button';
import { createField, Textarea } from 'components/common/formsControls/FormsControls';
import { maxLengthCreator, required } from 'helpers/validations';
import { InjectedFormProps, reduxForm } from 'redux-form';

import { AvatarItem } from './avatarItem/AvatarItem';
import styles from './dialogs.module.scss';
import { DialogItem } from './dialogsItem/DialogItem';
import { Message } from './message/Message';
import { DialogsPropsType, FormDataType } from './types';

const maxLength = maxLengthCreator(INPUT_MAX_LENGTH);

const NewMessageForm = (params: InjectedFormProps<FormDataType>) => {
  const { handleSubmit } = params;

  return (
    <form onSubmit={handleSubmit}>
      {createField(
        'Enter your message',
        'newMessageBody',
        [required, maxLength],
        Textarea,
        {},
        '',
        '',
        styles.input,
      )}
      <div>
        <Button className={styles.sendButton} type='submit'>
          Send
        </Button>
      </div>
    </form>
  );
};

const NewMessageReduxForm = reduxForm<FormDataType>({ form: 'dialogAddMessageForm' })(
  NewMessageForm,
);

export const Dialogs = (props: DialogsPropsType) => {
  const { avatars, dialogs, messages, sendMessage } = props;

  const avatarsElements = avatars.map((avatar) => {
    const { id, link } = avatar;

    return <AvatarItem id={id} key={id} link={link} />;
  });

  const dialogsElements = dialogs.map((dialog) => {
    const { id, name } = dialog;

    return <DialogItem id={id} key={id} name={name} />;
  });

  const messagesElements = messages.map((messageItem) => {
    const { id, message } = messageItem;

    return <Message id={id} key={id} message={message} />;
  });

  const addNewMessage = (formData: FormDataType) => {
    sendMessage(formData.newMessageBody);
  };

  return (
    <div className={styles.container}>
      <div className={styles.dialogs}>
        <div className={styles.dialogsItems}>{avatarsElements}</div>
        <div className={styles.dialogsItems}>{dialogsElements}</div>
      </div>
      <div className={styles.messages}>
        <div>{messagesElements}</div>
        <div className={styles.inputContainer}>
          <NewMessageReduxForm onSubmit={addNewMessage} />
        </div>
      </div>
    </div>
  );
};
