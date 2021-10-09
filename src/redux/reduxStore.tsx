import { combineReducers, createStore } from "redux";
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
import sidebarFriendsReducer, { SidebarFriendsType } from "./reducers/sidebarFriendsReducer";
import usersReducer, { UsersStateType } from "./reducers/usersReducer";
import authReducer, { AuthStateType } from "./reducers/authReducer";

export type RootStateType = {
  profilePage: PostsStateType
  dialogsPage: DialogsStateType
  sidebarFriends: SidebarFriendsType
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

let store = createStore(reducers);

export default store;