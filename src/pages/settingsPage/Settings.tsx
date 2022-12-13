import React from 'react';

import cn from 'classnames';
import { PATH } from 'enum/pathEnum';
import { NavLink } from 'react-router-dom';

import styles from './settings.module.scss';
import { SettingsPropsType } from './types';

export const Settings = (props: SettingsPropsType) => {
  const { isOwner, logout } = props;

  return (
    <div className={styles.buttonsContainer}>
      {isOwner ? (
        <NavLink className={styles.button} onClick={logout} to={`/${PATH.LOGIN}`}>
          Log out
        </NavLink>
      ) : (
        <div className={styles.withoutAuthorizationContainer}>
          <span className={styles.withoutAuthorizationText}>
            Settings are available to authorized users
          </span>
          <NavLink
            className={cn(styles.button, styles.withoutAuthorizationButton)}
            to={`/${PATH.LOGIN}`}
          >
            Login
          </NavLink>
        </div>
      )}
    </div>
  );
};
