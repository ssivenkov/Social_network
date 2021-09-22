import { combineReducers, createStore } from "redux";
import profileReducer, {
  addPostActionCreator,
  PostsStateType,
  updateNewPostTextActionCreator
} from "./reducers/profileReducer";
import dialogsReducer, {
  DialogsStateType,
  sendMessageActionCreator,
  updateNewMessageTextActionCreator
} from "./reducers/dialogsReducer";
import sidebarFriendsReducer, { SidebarFriendsType } from "./reducers/sidebarFriendsReducer";

export type RootStateType = {
  profilePage: PostsStateType
  dialogsPage: DialogsStateType
  sidebarFriends: SidebarFriendsType
}

export type ActionsTypes = ReturnType<typeof addPostActionCreator>
  | ReturnType<typeof updateNewPostTextActionCreator>
  | ReturnType<typeof updateNewMessageTextActionCreator>
  | ReturnType<typeof sendMessageActionCreator>

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebarFriends: sidebarFriendsReducer
});

let store = createStore(reducers);

export default store;