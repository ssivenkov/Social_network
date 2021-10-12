import { applyMiddleware, combineReducers, createStore } from "redux";
import profileReducer, {
  addPostActionCreator,
  PostsStateType,
  updateNewPostTextActionCreator,
} from "./reducers/profileReducer";
import dialogsReducer, {
  DialogsStateType,
  sendMessageActionCreator,
  updateNewMessageTextActionCreator,
} from "./reducers/dialogsReducer";
import sidebarFriendsReducer, { SidebarFriendsStateType } from "./reducers/sidebarFriendsReducer";
import usersReducer, { UsersStateType } from "./reducers/usersReducer";
import authReducer, { AuthStateType } from "./reducers/authReducer";
import thunkMiddleware from "redux-thunk";

export type RootStateType = {
  profilePage: PostsStateType
  dialogsPage: DialogsStateType
  sidebarFriends: SidebarFriendsStateType
  usersPage: UsersStateType
  auth: AuthStateType
}

export type ActionsTypes = ReturnType<typeof addPostActionCreator>
  | ReturnType<typeof updateNewPostTextActionCreator>
  | ReturnType<typeof updateNewMessageTextActionCreator>
  | ReturnType<typeof sendMessageActionCreator>

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebarFriends: sidebarFriendsReducer,
  usersPage: usersReducer,
  auth: authReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;