import React from 'react';

import styles from './message.module.scss';
import { MessagePropsType } from './types';

export const Message = (props: MessagePropsType) => {
  const { message } = props;

  return (
    <div>
      <span className={styles.message}>{message}</span>
    </div>
  );
};
