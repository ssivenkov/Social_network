import { DESKTOP_USERS_PORTION_SIZE, MOBILE_USERS_PORTION_SIZE } from 'constants/common';

import React from 'react';

import { Pagination } from 'components/common/pagination/Pagination';

import { Friend } from './friend/Friend';
import styles from './friendsPage.module.scss';
import { FriendsPropsType } from './types';

export const FriendsPage = (props: FriendsPropsType) => {
  const {
    totalFriendsCount,
    pageSize,
    currentPage,
    onPageChanged,
    friends,
    follow,
    unFollow,
    followingInProgress,
    isOwner,
  } = props;

  const pages = [];
  const pagesCount = Math.ceil(totalFriendsCount / pageSize);

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
      {friends.length === 0 ? (
        <div className={styles.withoutAuthorizationTextContainer}>
          <span className={styles.withoutAuthorizationText}>
            The users you are following will be displayed here
          </span>
        </div>
      ) : (
        <div>
          <Pagination
            currentPage={currentPage}
            onPageChanged={onPageChanged}
            pageSize={pageSize}
            portionSize={portionSizeCondition()}
            totalItemsCount={totalFriendsCount}
          />
          <div className={styles.container}>
            {friends.map((user) => (
              <Friend
                follow={follow}
                followingInProgress={followingInProgress}
                friend={user}
                isOwner={isOwner}
                key={user.id}
                unFollow={unFollow}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
