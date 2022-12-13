import React from 'react';

import anonymousUserPhoto from 'assets/images/user.png';
import { Button } from 'components/common/button/Button';
import { PATH } from 'enum/pathEnum';
import { NavLink } from 'react-router-dom';

import { UserPropsType } from './types';
import styles from './user.module.scss';

export const User = (props: UserPropsType) => {
  const { user, follow, unFollow, followingInProgress, isOwner } = props;

  return (
    <div className={styles.container}>
      <div className={styles.userContainer}>
        <div>
          <NavLink to={`/${PATH.PROFILE}/${user.id}`}>
            <img
              alt='User avatar'
              className={styles.avatar}
              src={user.photos.small !== null ? user.photos.small : anonymousUserPhoto}
            />
          </NavLink>
        </div>
        {isOwner && (
          <div>
            {user.followed ? (
              <Button
                className={styles.button}
                disabled={followingInProgress.some((id: number) => id === user.id)}
                onClick={() => {
                  unFollow(user.id);
                }}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                className={styles.button}
                disabled={followingInProgress.some((id: number) => id === user.id)}
                onClick={() => {
                  follow(user.id);
                }}
              >
                Follow
              </Button>
            )}
          </div>
        )}
        <div>
          <div>
            <div className={styles.name}>{user.name}</div>
            <div className={styles.status}>{user.status}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
