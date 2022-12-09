import { compose } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { AppReducerActionsType } from './reducers/appReducer/types';
import { AuthReducerActionsType } from './reducers/authReducer/types';
import { DialogsReducerActionsType } from './reducers/dialogsReducer/types';
import { FriendsReducerActionsType } from './reducers/friendsReducer/types';
import { ProfileReducerActionsType } from './reducers/profileReducer/types';
import { UsersReducerActionsType } from './reducers/usersReducer/types';
import { RootReducer } from './store';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export type RootReducerType = typeof RootReducer;

export type RootStateType = ReturnType<RootReducerType>;

export type RootActionsType =
  | ProfileReducerActionsType
  | DialogsReducerActionsType
  | UsersReducerActionsType
  | FriendsReducerActionsType
  | AuthReducerActionsType
  | AppReducerActionsType;

export type RootThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateType,
  unknown,
  RootActionsType
>;
