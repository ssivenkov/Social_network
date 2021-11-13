import React from "react";
import s from "./Pagination.module.css";

type PaginationPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

export let Pagination: React.FC<PaginationPropsType> = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div>
        {pages.map(p => {
            return <span key={p} onClick={() => {onPageChanged(p)}}
                         className={currentPage === p ? s.selectPage : ""}>{p}</span>
        })}
    </div>
}