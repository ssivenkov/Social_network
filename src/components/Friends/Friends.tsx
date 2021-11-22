import React from "react";
import { UserType } from "../../redux/reducers/usersReducer";
import { Pagination } from "../common/Pagination/Pagination";
import { Friend } from "./Friend/Friend";

export type FriendsPropsType = {
    totalFriendsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    friends: Array<UserType>
    follow: (friendId: number) => void
    unFollow: (friendId: number) => void
    followingInProgress: Array<number>
    isOwner: number | null
}

export let Friends: React.FC<FriendsPropsType> = ({
    totalFriendsCount, pageSize, currentPage, onPageChanged,
    friends, follow, unFollow, followingInProgress, isOwner,
}) => {
    let pagesCount = Math.ceil(totalFriendsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div>
        <Pagination totalItemsCount={totalFriendsCount} currentPage={currentPage} onPageChanged={onPageChanged}
                    pageSize={pageSize} portionSize={20}/>
        {
            friends.length === 0
                ? <div>The users you are following will be displayed here</div>
                : friends.map(u => <Friend key={u.id}
                                           friend={u}
                                           follow={follow}
                                           unFollow={unFollow}
                                           followingInProgress={followingInProgress}
                                           isOwner={isOwner}
                />,
                )
        }
    </div>
}