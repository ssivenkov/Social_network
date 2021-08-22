import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";
import AvatarItem from "./AvatarsItem/AvatarsItem";

type DialogType = {
  id: number
  name: string
}

type MessageType = {
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
}

export type DialogsType = {
  state: DialogsStateType
}

export const Dialogs = (props: DialogsType) => {
  let avatarsElements = props.state.avatars
    .map(el => <AvatarItem key={el.id} link={el.link} id={el.id} />);

  let dialogsElements = props.state.dialogs
    .map(el => <DialogItem key={el.id} name={el.name} id={el.id} />);

  let messagesElements = props.state.messages
    .map(el => <Message key={el.id} message={el.message} id={el.id} />);

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {avatarsElements}
      </div>
      <div className={s.dialogsItems}>
        {dialogsElements}
      </div>
      <div className={s.messages}>
        {messagesElements}
      </div>
    </div>
  );
};