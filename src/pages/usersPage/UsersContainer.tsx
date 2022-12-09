import React, { Component, ComponentType } from 'react';

import { Preloader } from 'components/common/preloader/Preloader';
import stylePreloader from 'components/common/preloader/preloader.module.scss';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  setCurrentPage,
  getUsers,
  follow,
  unFollow,
} from 'store/reducers/usersReducer/usersReducer';
import {
  getCurrentPageSelector,
  getFollowingInProgressSelector,
  getIsFetchingSelector,
  getPageSizeSelector,
  getTotalUsersCountSelector,
  getUsersSelector,
} from 'store/selectors/userSelectors';
import { RootStateType } from 'store/types';

import {
  MapDispatchToPropsType,
  MapStateToPropsType,
  UsersContainerPropsType,
} from './types';
import { Users } from './Users';

const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
  return {
    users: getUsersSelector(state),
    pageSize: getPageSizeSelector(state),
    totalUsersCount: getTotalUsersCountSelector(state),
    currentPage: getCurrentPageSelector(state),
    isFetching: getIsFetchingSelector(state),
    followingInProgress: getFollowingInProgressSelector(state),
    isOwner: state.auth.userId,
  };
};

class UsersContainer extends Component<UsersContainerPropsType> {
  componentDidMount() {
    const { currentPage, getUsers, pageSize } = this.props;

    getUsers(currentPage, pageSize);
  }

  onPageChanged = (pageNumber: number) => {
    const { getUsers, pageSize, setCurrentPage } = this.props;

    setCurrentPage(pageNumber);
    getUsers(pageNumber, pageSize);
  };

  render() {
    const {
      currentPage,
      follow,
      followingInProgress,
      isFetching,
      isOwner,
      pageSize,
      totalUsersCount,
      unFollow,
      users,
    } = this.props;

    return (
      <>
        {isFetching ? (
          <div className={stylePreloader.absolutePreloaderContainer}>
            <Preloader />
          </div>
        ) : null}
        <Users
          currentPage={currentPage}
          follow={follow}
          followingInProgress={followingInProgress}
          isOwner={isOwner}
          onPageChanged={this.onPageChanged}
          pageSize={pageSize}
          totalUsersCount={totalUsersCount}
          unFollow={unFollow}
          users={users}
        />
      </>
    );
  }
}

export default compose<ComponentType>(
  connect<MapStateToPropsType, MapDispatchToPropsType, object, RootStateType>(
    mapStateToProps,
    { setCurrentPage, getUsers, follow, unFollow },
  ),
)(UsersContainer);
