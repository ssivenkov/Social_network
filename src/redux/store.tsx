import { PostsStateType } from "../components/Profile/MyPosts/MyPosts";
import { DialogsStateType } from "../components/Dialogs/Dialogs";
import { NavStateType } from "../components/Nav/Nav";
import profileReducer, { addPostActionCreator, updateNewPostTextActionCreator } from "./reducers/profileReducer";
import dialogsReducer, { sendMessageActionCreator, updateNewMessageTextActionCreator } from "./reducers/dialogsReducer";
import sidebarFriendsReducer from "./reducers/sidebarFriendsReducer";

export type RootStateType = {
  profilePage: PostsStateType
  dialogsPage: DialogsStateType
  sidebarFriends: NavStateType
}

export type StoreType = {
  _state: RootStateType
  getState: () => RootStateType
  _callSubscriber: (store: StoreType) => void
  subscribe: (observer: (store: StoreType) => void) => void
  dispatch: (action: ActionsTypes) => void
}

export type ActionsTypes = ReturnType<typeof addPostActionCreator>
  | ReturnType<typeof updateNewPostTextActionCreator>
  | ReturnType<typeof updateNewMessageTextActionCreator>
  | ReturnType<typeof sendMessageActionCreator>

let store: StoreType = {
  _state: {
    profilePage: {
      messageForNewPost: "",
      posts: [
        { id: 1, message: "It's my first post.", likesCount: 20 },
        { id: 2, message: "Hello, welcome!", likesCount: 15 }
      ]
    },
    dialogsPage: {
      dialogs: [
        { id: 1, name: "Dimych" },
        { id: 2, name: "Valera" },
        { id: 3, name: "Katya" },
        { id: 4, name: "Andrei" },
        { id: 5, name: "Viktor" }
      ],
      messages: [
        { id: 1, message: "Ha" },
        { id: 2, message: "Yo!" },
        { id: 3, message: "How are you ?" },
        { id: 4, message: "This social network is awesome!" },
        { id: 5, message: "Go" }
      ],
      newPostTextBody: "",
      newMessageTextBody: "",
      avatars: [
        { id: 1, link: "https://i.pinimg.com/736x/3f/47/b3/3f47b39a801290271ad789d1ecc053cc.jpg" },
        { id: 2, link: "https://images.wallpaperscraft.ru/image/kot_morda_vzglyad_usy_81681_1280x1280.jpg" },
        { id: 3, link: "https://mobimg.b-cdn.net/v3/fetch/62/620e78234f747fa272d1bbb5a9032467.jpeg" },
        { id: 4, link: "https://wallbox.ru/resize/800x480/wallpapers/main/201522/344385ce96c7f38.jpg" },
        { id: 5, link: "https://www.ejin.ru/wp-content/uploads/2019/05/smeshnoj-kotik-oblizyvaetsja.jpg" }
      ]
    },
    sidebarFriends: {
      friends: [
        { id: 1, link: "https://i.pinimg.com/736x/3f/47/b3/3f47b39a801290271ad789d1ecc053cc.jpg" },
        { id: 2, link: "https://images.wallpaperscraft.ru/image/kot_morda_vzglyad_usy_81681_1280x1280.jpg" },
        { id: 3, link: "https://mobimg.b-cdn.net/v3/fetch/62/620e78234f747fa272d1bbb5a9032467.jpeg" }
      ]
    }
  },

  _callSubscriber() {
    console.log("State changed, but subscriber not defined");
  },
  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action)
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
    this._state.sidebarFriends = sidebarFriendsReducer(this._state.sidebarFriends/*, action*/)

    this._callSubscriber(store);
  }
};

export default store;