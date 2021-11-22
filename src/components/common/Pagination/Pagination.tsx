import React, { useState } from "react";
import s from "./Pagination.module.scss";
import cn from "classnames";

type PaginationPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize: number
}

export let Pagination: React.FC<PaginationPropsType> = ({
    totalItemsCount,
    pageSize,
    currentPage,
    onPageChanged,
    portionSize,
}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = (pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState<number>(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return <div>
        {portionNumber > 1 &&
        <button onClick={() => setPortionNumber(portionNumber - 1)}>Prev</button>}
        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => {
                return <span key={p}
                             onClick={() => {onPageChanged(p)}}
                             className={cn(s.page, {[s.selectPage]: currentPage === p})}>{p}</span>
            })}
        {portionCount > portionNumber &&
        <button onClick={() => setPortionNumber(portionNumber + 1)}>Next</button>}
    </div>
}