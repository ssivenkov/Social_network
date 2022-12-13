import React from 'react';

import { create } from 'react-test-renderer';

import { DESKTOP_USERS_PORTION_SIZE } from 'constants/common';

import { Pagination } from './Pagination';

describe('pagination component', () => {
  test('pages count should be 200 but should be showed 15', () => {
    const component = create(
      <Pagination
        currentPage={1}
        onPageChanged={() => {}}
        pageSize={1}
        portionSize={DESKTOP_USERS_PORTION_SIZE}
        totalItemsCount={200}
      />,
    );
    const instance = component.root;
    const spans = instance.findAllByType('span');

    expect(spans.length).toBe(DESKTOP_USERS_PORTION_SIZE + 1);
  });
});
