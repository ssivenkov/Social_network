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
        <button disabled={portionNumber <= 1}
                onClick={() => setPortionNumber(portionNumber - 1)}>Prev list
        </button>
        <button disabled={currentPage <= 1}
                onClick={() => onPageChanged(currentPage - 1)}>Prev
        </button>

        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => {
                return <span key={p}
                             onClick={() => {onPageChanged(p)}}
                             className={cn(s.page, {[s.selectPage]: currentPage === p})}>{p}</span>
            })
        }

        <button disabled={currentPage >= pagesCount}
                onClick={() => onPageChanged(currentPage + 1)}>Next
        </button>
        <button disabled={portionCount <= portionNumber}
                onClick={() => setPortionNumber(portionNumber + 1)}>Next list
        </button>
    </div>
}