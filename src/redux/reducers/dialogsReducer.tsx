import { DialogsStateType } from "../../components/Dialogs/DialogsContainer";
import { ActionsTypes } from "../store";

const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_DIALOG_MESSAGE = "SEND-DIALOG-MESSAGE";

let initialState = {
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
}

const dialogsReducer = (state: DialogsStateType = initialState, action: ActionsTypes) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY:
      state.newMessageTextBody = action.newMessageText;
      return state;

    case SEND_DIALOG_MESSAGE:
      const body = state.newMessageTextBody;
      state.messages.push({ id: 6, message: body });
      state.newMessageTextBody = "";
      return state;

    default:
      return state;
  }
};

export const updateNewMessageTextActionCreator = (newText: string) => {
  return {
    type: UPDATE_NEW_MESSAGE_BODY,
    newMessageText: newText
  } as const
}

export const sendMessageActionCreator = () => {
  return {
    type: SEND_DIALOG_MESSAGE
  } as const
}

export default dialogsReducer;