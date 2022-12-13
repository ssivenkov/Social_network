import React from 'react';

import styles from '../../profileInfo.module.scss';

import { ContactPropsType } from './types';

export const Contact = (props: ContactPropsType) => {
  const { contactTitle, contactValue } = props;

  return <div className={styles.contactText}>{`${contactTitle}: ${contactValue}`}</div>;
};
