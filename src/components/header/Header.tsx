import React, { useEffect } from 'react';

import logo from 'assets/images/logo.png';
import AnonymousUserPhoto from 'assets/images/user.png';
import { Button } from 'components/common/button/Button';
import { PATH } from 'enum/pathEnum';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout, setProfileSmallPhoto } from 'store/reducers/authReducer/authReducer';
import {
  isAuthSelector,
  loginSelector,
  profileSmallPhotoSelector,
  userIDSelector,
} from 'store/selectors/authSelectors';

import styles from './header.module.scss';

export const Header = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector(isAuthSelector);
  const login = useSelector(loginSelector);
  const userID = useSelector(userIDSelector);
  const profileSmallPhoto = useSelector(profileSmallPhotoSelector);

  const logoutCallback = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (userID) {
      dispatch(setProfileSmallPhoto(userID));
    }
  }, [userID]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <img alt='Social network logo' className={styles.logo} src={logo} />
        <div>
          {isAuth ? (
            <div className={styles.infoContainer}>
              <span className={styles.login}>{login}</span>
              <div className={styles.avatar}>
                <img
                  alt='Your small avatar'
                  src={profileSmallPhoto || AnonymousUserPhoto}
                />
              </div>
              <Button className={styles.button}>
                <NavLink onClick={logoutCallback} to={`/${PATH.LOGIN}`}>
                  Log out
                </NavLink>
              </Button>
            </div>
          ) : (
            <Button className={styles.button}>
              <NavLink to={`/${PATH.LOGIN}`}>Log in</NavLink>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
