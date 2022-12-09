import React from 'react';

import anonymousFriendPhoto from 'assets/images/user.png';
import { Button } from 'components/common/button/Button';
import { PATH } from 'enum/pathEnum';
import { NavLink } from 'react-router-dom';

import styles from './friend.module.scss';
import { FriendPropsType } from './types';

export const Friend = (props: FriendPropsType) => {
  const { friend, follow, unFollow, followingInProgress, isOwner } = props;

  return (
    <div className={styles.container}>
      <div className={styles.friendContainer}>
        <div>
          <NavLink to={`/${PATH.PROFILE}/${friend.id}`}>
            <img
              alt='Friend avatar'
              className={styles.avatar}
              src={
                friend.photos.small !== null ? friend.photos.small : anonymousFriendPhoto
              }
            />
          </NavLink>
        </div>
        {isOwner && (
          <div>
            {friend.followed ? (
              <Button
                className={styles.button}
                disabled={followingInProgress.some((id: number) => id === friend.id)}
                onClick={() => {
                  unFollow(friend.id);
                }}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                className={styles.button}
                disabled={followingInProgress.some((id: number) => id === friend.id)}
                onClick={() => {
                  follow(friend.id);
                }}
              >
                Follow
              </Button>
            )}
          </div>
        )}
        <div>
          <div>
            <div className={styles.name}>{friend.name}</div>
            <div className={styles.status}>{friend.status}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
