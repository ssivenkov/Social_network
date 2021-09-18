import { combineReducers, createStore } from "redux";
import profileReducer, { addPostActionCreator, updateNewPostTextActionCreator } from "./reducers/profileReducer";
import dialogsReducer, { sendMessageActionCreator, updateNewMessageTextActionCreator } from "./reducers/dialogsReducer";
import sidebarFriendsReducer from "./reducers/sidebarFriendsReducer";
import { DialogsStateType } from "../components/Dialogs/DialogsContainer";
import { PostsStateType } from "../components/Profile/MyPosts/MyPostsContainer";
import { NavStateType } from "../components/Nav/Nav";

export type RootStateType = {
  profilePage: PostsStateType
  dialogsPage: DialogsStateType
  sidebarFriends: NavStateType
}

export type StoreType = typeof store

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