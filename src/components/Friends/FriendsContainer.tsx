import React from "react";
import { connect } from "react-redux";
import {
    setCurrentPage, UserType, follow, unFollow, getFriends,
} from "../../redux/reducers/usersReducer";
import { RootStateType } from "../../redux/reduxStore";
import { Friends } from "./Friends";
import { Preloader } from "../common/Preloader/Preloader";
import { compose } from "redux";
import {
    getCurrentPageSelector, getFollowingInProgressSelector, getIsFetchingSelector,
    getPageSizeSelector,
    getTotalUsersCountSelector,
    getUsersSelector,
} from "../../redux/selectors/userSelector";

type MapStateToPropsType = {
    friends: Array<UserType>
    pageSize: number
    totalFriendsCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
    isOwner: number | null
}

let mapStateToProps = (state: RootStateType): MapStateToPropsType => {
    return {
        friends: getUsersSelector(state),
        pageSize: getPageSizeSelector(state),
        totalFriendsCount: getTotalUsersCountSelector(state),
        currentPage: getCurrentPageSelector(state),
        isFetching: getIsFetchingSelector(state),
        followingInProgress: getFollowingInProgressSelector(state),
        isOwner: state.auth.userId,
    };
};

type MapDispatchToPropsType = {
    follow: (friendId: number) => void
    unFollow: (friendId: number) => void
    setCurrentPage: (pageNumber: number) => void
    getFriends: (page: number, pageSize: number) => void
}

export type FriendsContainerPropsType = MapStateToPropsType & MapDispatchToPropsType;

class FriendsContainer extends React.Component<FriendsContainerPropsType> {
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getFriends(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        const {setCurrentPage, pageSize} = this.props;
        setCurrentPage(pageNumber);
        this.props.getFriends(pageNumber, pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Friends totalFriendsCount={this.props.totalFriendsCount}
                     pageSize={this.props.pageSize}
                     currentPage={this.props.currentPage}
                     onPageChanged={this.onPageChanged}
                     friends={this.props.friends}
                     follow={this.props.follow}
                     unFollow={this.props.unFollow}
                     followingInProgress={this.props.followingInProgress}
                     isOwner={this.props.isOwner}
            />
        </>
    }
}

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, RootStateType>
    (mapStateToProps, {setCurrentPage, getFriends, follow, unFollow}),
)(FriendsContainer)