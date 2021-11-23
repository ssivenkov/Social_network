import React from "react";
import { UserType } from "../../redux/reducers/usersReducer";
import { Pagination } from "../common/Pagination/Pagination";
import { User } from "./User/User";

export type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    followingInProgress: Array<number>
    isOwner: number | null
}

export let Users: React.FC<UsersPropsType> = ({
    totalUsersCount, pageSize, currentPage, onPageChanged,
    users, follow, unFollow, followingInProgress, isOwner,
}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div>
        <Pagination totalItemsCount={totalUsersCount} currentPage={currentPage} onPageChanged={onPageChanged}
                    pageSize={pageSize} portionSize={15}
        />
        {
            users.map(u => <User key={u.id}
                                 user={u}
                                 follow={follow}
                                 unFollow={unFollow}
                                 followingInProgress={followingInProgress}
                                 isOwner={isOwner}
                />,
            )
        }
    </div>
}