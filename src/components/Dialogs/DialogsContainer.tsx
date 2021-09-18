import React from "react";
import { sendMessageActionCreator, updateNewMessageTextActionCreator } from "../../redux/reducers/dialogsReducer";
/*import { ActionsTypes } from "../../redux/store";*/
import { Dialogs } from "./Dialogs";
import StoreContext from "../../StoreContext";

export type DialogType = {
  id: number
  name: string
}

export type MessageType = {
  id: number
  message: string
}

export type AvatarType = {
  id: number
  link: string
}

export type DialogsStateType = {
  dialogs: Array<DialogType>
  messages: Array<MessageType>
  avatars: Array<AvatarType>
  newPostTextBody: string
  newMessageTextBody: string
}

/*export type DialogsType = {
  state: DialogsStateType
  dispatch: (action: ActionsTypes) => void
  message: string
}*/

export const DialogsContainer = (/*props: DialogsType*/) => {
  return <StoreContext.Consumer>
    { (store) => {
      let state = store.getState();
      const onUpdateNewMessageText = (text: string) => {
        const action = updateNewMessageTextActionCreator(text);
        store.dispatch(action);
      };

      const onSendMessage = () => {
        const action = sendMessageActionCreator();
        store.dispatch(action);
      };

      return <Dialogs avatars={state.dialogsPage.avatars}
                      dialogs={state.dialogsPage.dialogs}
                      messages={state.dialogsPage.messages}
                      updateNewMessageText={onUpdateNewMessageText}
                      sendMessage={onSendMessage}
                      message={state.dialogsPage.message}
      />;
    }
  }
  </StoreContext.Consumer>;
};