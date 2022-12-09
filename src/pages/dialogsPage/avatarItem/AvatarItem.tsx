import React from 'react';

import styles from './avatarItem.module.scss';
import { AvatarItemPropsType } from './types';

export const AvatarItem = (props: AvatarItemPropsType) => {
  const { link } = props;

  return (
    <div>
      <img alt='User avatar' className={styles.avatar} src={link} />
    </div>
  );
};
