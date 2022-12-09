import React, { Component, ComponentType } from 'react';

import { Preloader } from 'components/common/preloader/Preloader';
import stylePreloader from 'components/common/preloader/preloader.module.scss';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  follow,
  getFriends,
  setCurrentPage,
  unFollow,
} from 'store/reducers/friendsReducer/friendsReducer';
import {
  getCurrentPageSelector,
  getFollowingInProgressSelector,
  getFriendsSelector,
  getIsFetchingSelector,
  getPageSizeSelector,
  getTotalFriendsCountSelector,
} from 'store/selectors/friendSelectors';
import { RootStateType } from 'store/types';

import { FriendsPage } from './FriendsPage';
import {
  FriendsContainerPropsType,
  MapDispatchToPropsType,
  MapStateToPropsType,
} from './types';

const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
  return {
    friends: getFriendsSelector(state),
    pageSize: getPageSizeSelector(state),
    totalFriendsCount: getTotalFriendsCountSelector(state),
    currentPage: getCurrentPageSelector(state),
    isFetching: getIsFetchingSelector(state),
    followingInProgress: getFollowingInProgressSelector(state),
    isOwner: state.auth.userId,
  };
};

class FriendsPageContainer extends Component<FriendsContainerPropsType> {
  componentDidMount() {
    const { currentPage, getFriends, pageSize } = this.props;

    getFriends(currentPage, pageSize);
  }

  onPageChanged = (pageNumber: number) => {
    const { setCurrentPage, pageSize } = this.props;

    setCurrentPage(pageNumber);
    this.props.getFriends(pageNumber, pageSize);
  };

  render() {
    const {
      currentPage,
      follow,
      followingInProgress,
      friends,
      isFetching,
      isOwner,
      pageSize,
      totalFriendsCount,
      unFollow,
    } = this.props;

    return (
      <>
        {isFetching ? (
          <div className={stylePreloader.absolutePreloaderContainer}>
            <Preloader />
          </div>
        ) : null}
        <FriendsPage
          currentPage={currentPage}
          follow={follow}
          followingInProgress={followingInProgress}
          friends={friends}
          isOwner={isOwner}
          onPageChanged={this.onPageChanged}
          pageSize={pageSize}
          totalFriendsCount={totalFriendsCount}
          unFollow={unFollow}
        />
      </>
    );
  }
}

export default compose<ComponentType>(
  connect<MapStateToPropsType, MapDispatchToPropsType, object, RootStateType>(
    mapStateToProps,
    { setCurrentPage, getFriends, follow, unFollow },
  ),
)(FriendsPageContainer);
