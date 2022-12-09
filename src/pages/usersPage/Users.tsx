import { DESKTOP_USERS_PORTION_SIZE, MOBILE_USERS_PORTION_SIZE } from 'constants/common';

import React from 'react';

import { Pagination } from 'components/common/pagination/Pagination';

import { UsersPropsType } from './types';
import { User } from './user/User';
import styles from './users.module.scss';

export const Users = (props: UsersPropsType) => {
  const {
    totalUsersCount,
    pageSize,
    currentPage,
    onPageChanged,
    users,
    follow,
    unFollow,
    followingInProgress,
    isOwner,
  } = props;

  const pagesCount = Math.ceil(totalUsersCount / pageSize);
  const pages = [];

  for (let index = 1; index <= pagesCount; index += 1) {
    pages.push(index);
  }

  const portionSizeCondition = () => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {
      return MOBILE_USERS_PORTION_SIZE;
    } else {
      return DESKTOP_USERS_PORTION_SIZE;
    }
  };

  return (
    <div className={styles.wrapper}>
      <Pagination
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        pageSize={pageSize}
        portionSize={portionSizeCondition()}
        totalItemsCount={totalUsersCount}
      />
      <div className={styles.container}>
        {users.map((user) => (
          <User
            follow={follow}
            followingInProgress={followingInProgress}
            isOwner={isOwner}
            key={user.id}
            unFollow={unFollow}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};
