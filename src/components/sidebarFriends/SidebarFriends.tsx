import React from 'react';

import styles from './sidebarFriends.module.scss';
import { SidebarFriendsPropsType } from './types';

export const SidebarFriends = (props: SidebarFriendsPropsType) => {
  const { link } = props;

  return (
    <div className={styles.avatarContainer}>
      <img alt='User avatar' className={styles.avatar} src={link} />
    </div>
  );
};
