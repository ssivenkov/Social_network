import React from "react";
import { sendMessageActionCreator, updateNewMessageTextActionCreator } from "../../redux/reducers/dialogsReducer";
import { ActionsTypes } from "../../redux/store";
import { Dialogs } from "./Dialogs";

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

export type DialogsType = {
  state: DialogsStateType
  dispatch: (action: ActionsTypes) => void
  message: string
}

export const DialogsContainer = (props: DialogsType) => {
  const onUpdateNewMessageText = (text: string) => {
    const action = updateNewMessageTextActionCreator(text)
    props.dispatch(action)
  }

  const onSendMessage = () => {
    const action = sendMessageActionCreator();
    props.dispatch(action);
  }

  return (
    <Dialogs avatars={props.state.avatars}
             dialogs={props.state.dialogs}
             messages={props.state.messages}
             updateNewMessageText={onUpdateNewMessageText}
             sendMessage={onSendMessage}
             message={props.message}
    />
  )
};