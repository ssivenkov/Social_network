import React, { useState } from 'react';

import cn from 'classnames';
import { Button } from 'components/common/button/Button';

import styles from './pagination.module.scss';
import { PaginationPropsType } from './types';

export const Pagination = (props: PaginationPropsType) => {
  const { totalItemsCount, pageSize, currentPage, onPageChanged, portionSize } = props;

  const pagesCount = Math.ceil(totalItemsCount / pageSize);
  const pages = [];

  for (let index = 1; index <= pagesCount; index += 1) {
    pages.push(index);
  }

  const portionCount = pagesCount / portionSize;
  const [portionNumber, setPortionNumber] = useState<number>(1);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={styles.pagination}>
      <div className={styles.buttonContainer}>
        <Button
          className={styles.button}
          disabled={portionNumber <= 1}
          onClick={() => setPortionNumber(portionNumber - 1)}
        >
          Prev list
        </Button>

        <Button
          className={styles.button}
          disabled={currentPage <= 1}
          onClick={() => onPageChanged(currentPage - 1)}
        >
          Prev
        </Button>

        <Button
          className={styles.button}
          disabled={currentPage >= pagesCount}
          onClick={() => onPageChanged(currentPage + 1)}
        >
          Next
        </Button>

        <Button
          className={styles.button}
          disabled={portionCount <= portionNumber}
          onClick={() => setPortionNumber(portionNumber + 1)}
        >
          Next list
        </Button>
      </div>
      <div className={styles.text}>
        <span>{'Current page: '}</span>
        <p className={styles.currentNumber}>{currentPage}</p>
      </div>
      <div>
        {pages
          .filter(
            (page) => page >= leftPortionPageNumber && page <= rightPortionPageNumber,
          )
          .map((filteredPage) => {
            return (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <span
                className={cn(styles.page, {
                  [styles.selectPage]: currentPage === filteredPage,
                })}
                key={filteredPage}
                onClick={() => {
                  onPageChanged(filteredPage);
                }}
                role='button'
                tabIndex={0}
              >
                {filteredPage}
              </span>
            );
          })}
      </div>
    </div>
  );
};
