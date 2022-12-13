import React from 'react';

import { PATH } from 'enum/pathEnum';
import { NavLink } from 'react-router-dom';

import styles from './dialogItem.module.scss';
import { DialogItemPropsType } from './types';

export const DialogItem = (props: DialogItemPropsType) => {
  const { id, name } = props;

  const path = `/${PATH.DIALOGS}/${id}`;

  return (
    <NavLink activeClassName={styles.active} className={styles.dialog} to={path}>
      {name}
    </NavLink>
  );
};
