import React from 'react';

import AnonymousUserAvatar from 'assets/images/user.png';

import styles from './post.module.scss';
import { PostPropsType } from './types';

export const Post = (props: PostPropsType) => {
  const { message, likesCount, userAvatar } = props;

  return (
    <div className={styles.post}>
      <div className={styles.avatar}>
        <img alt='user avatar' src={userAvatar || AnonymousUserAvatar} />
      </div>
      <div className={styles.textBlock}>
        <p className={styles.userMessage}>{message}</p>
        <div className={styles.likesWrapper}>
          <span>
            {'likes: '}
            <span className={styles.likesCount}>{likesCount}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
