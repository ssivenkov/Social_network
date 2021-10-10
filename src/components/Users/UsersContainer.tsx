import { connect } from "react-redux";
import {
    follow,
    setCurrentPage,
    setUsers,
    setTotalUsersCount, toggleIsFetching,
    unFollow,
    UserType, toggleFollowingProgress,
} from "../../redux/reducers/usersReducer";
import { RootStateType } from "../../redux/reduxStore";
import React from "react";
import { Users } from "./Users";
import { Preloader } from "../common/Preloader/Preloader";
import { usersAPI } from "../../api/api";

class UsersComponent extends React.Component<UsersClassType> {
    componentDidMount() {
        this.props.toggleIsFetching(true);
        if (this.props.users.length === 0) {
            usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
                .then(data => {
                    this.props.toggleIsFetching(false);
                    this.props.setUsers(data.items);
                    this.props.setTotalUsersCount(data.totalCount);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);
        usersAPI.getUsers(pageNumber, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unFollow={this.props.unFollow}
                   followingInProgress={this.props.followingInProgress}
                   toggleFollowingProgress={this.props.toggleFollowingProgress}
            />
        </>
    }
}

type mapStateToUsersPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}

let mapStateToProps = (state: RootStateType): mapStateToUsersPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    };
};

type mapDispatchToUsersType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
}

export type UsersClassType = mapStateToUsersPropsType & mapDispatchToUsersType;

/*let mapDispatchToProps = (dispatch: any) => {
 return {
 follow: (userId: number) => {
 dispatch(followAC(userId));
 },
 unFollow: (userId: number) => {
 dispatch(unFollowAC(userId));
 },
 setUsers: (users: Array<UserType>) => {
 dispatch(setUsersAC(users));
 },
 setCurrentPage: (pageNumber: number) => {
 dispatch(setCurrentPageAC(pageNumber));
 },
 setTotalUsersCount: (totalCount: number) => {
 dispatch(setUsersTotalCountAC(totalCount))
 },
 toggleIsFetching: (isFetching: boolean) => {
 dispatch(toggleIsFetchingAC(isFetching))
 },
 };
 };*/

export default connect(mapStateToProps, {
    follow, unFollow, setUsers,
    setCurrentPage, setTotalUsersCount, toggleIsFetching, toggleFollowingProgress,

    /*
     toggleIsFetching: (isFetching: boolean) => {
     dispatch(toggleIsFetchingAC(isFetching))
     },
     =>
     toggleIsFetching: (isFetching: boolean) => {
     dispatch(toggleIsFetching(isFetching))
     },
     =>
     toggleIsFetching: toggleIsFetching
     =>
     toggleIsFetching
     */
})(UsersComponent);