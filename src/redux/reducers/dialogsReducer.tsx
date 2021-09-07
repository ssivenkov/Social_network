import { DialogsStateType } from "../../components/Dialogs/Dialogs";
import { ActionsTypes } from "../store";

const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_DIALOG_MESSAGE = "SEND-DIALOG-MESSAGE";

const dialogsReducer = (state: DialogsStateType, action: ActionsTypes) => {
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