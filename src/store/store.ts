import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';

import { appReducer } from './reducers/appReducer/appReducer';
import { authReducer } from './reducers/authReducer/authReducer';
import { dialogsReducer } from './reducers/dialogsReducer/dialogsReducer';
import { friendsReducer } from './reducers/friendsReducer/friendsReducer';
import { profileReducer } from './reducers/profileReducer/profileReducer';
import { sidebarFriendsReducer } from './reducers/sidebarFriendsReducer/sidebarFriendsReducer';
import { usersReducer } from './reducers/usersReducer/usersReducer';

export const RootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebarFriends: sidebarFriendsReducer,
  usersPage: usersReducer,
  friendsPage: friendsReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  RootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);
