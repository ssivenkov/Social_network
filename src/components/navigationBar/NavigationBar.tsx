import React from 'react';

import cn from 'classnames';
import { PATH } from 'enum/pathEnum';
import { NavLink } from 'react-router-dom';

import { SidebarFriends } from '../sidebarFriends/SidebarFriends';

import styles from './navigation.module.scss';
import { NavigationBarPropsType } from './types';

export const NavigationBar = (props: NavigationBarPropsType) => {
  const { friends } = props;

  const friendsElements = friends.map((friend) => {
    const { id, link } = friend;

    return <SidebarFriends id={id} key={id} link={link} />;
  });

  return (
    <nav className={styles.navigationBar}>
      <div className={styles.section}>
        <NavLink
          activeClassName={styles.active}
          className={styles.item}
          to={`/${PATH.PROFILE}`}
        >
          Profile
        </NavLink>
        <NavLink
          activeClassName={styles.active}
          className={styles.item}
          to={`/${PATH.DIALOGS}`}
        >
          Messages
        </NavLink>
        <NavLink
          activeClassName={styles.active}
          className={styles.item}
          to={`/${PATH.USERS}`}
        >
          Users
        </NavLink>
        <NavLink
          activeClassName={styles.activeFriends}
          className={styles.item}
          to={`/${PATH.FRIENDS}`}
        >
          Friends
        </NavLink>
        <NavLink
          activeClassName={styles.active}
          className={styles.item}
          to={`/${PATH.MUSIC}`}
        >
          Music
        </NavLink>
        <NavLink
          activeClassName={styles.active}
          className={cn(styles.item, styles.margin)}
          to={`/${PATH.SETTINGS}`}
        >
          Settings
        </NavLink>
        <div className={styles.friendsContainer}>{friendsElements}</div>
      </div>
    </nav>
  );
};
