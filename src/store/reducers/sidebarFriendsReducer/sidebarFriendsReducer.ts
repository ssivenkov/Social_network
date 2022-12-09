import cat1 from 'assets/images/cat1.jpg';
import cat2 from 'assets/images/cat2.jpg';
import cat4 from 'assets/images/cat4.jpg';

import { SidebarFriendsReducerStateType } from './type';

const initialState = {
  friends: [
    { id: 1, link: cat1 },
    { id: 2, link: cat2 },
    { id: 3, link: cat4 },
  ],
};

export const sidebarFriendsReducer = (
  state: SidebarFriendsReducerStateType = initialState,
): SidebarFriendsReducerStateType => {
  return state;
};
