import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";
import AvatarItem from "./AvatarsItem/AvatarsItem";

type DialogsType = {
  id: number
  name: string
}

type MessagesType = {
  id: number
  message: string
}

export type AvatarsType = {
  id: number
  link: string
}

export type DialogsStateType = {
  dialogs: Array<DialogsType>
  messages: Array<MessagesType>
  avatars: Array<AvatarsType>
}

export type Dialogs = {
  state: DialogsStateType
}

export const Dialogs = (props: Dialogs) => {
  let avatarsElements = props.state.avatars
    .map(el => <AvatarItem link={el.link} id={el.id} />);

  let dialogsElements = props.state.dialogs
    .map(el => <DialogItem name={el.name} id={el.id} />);

  let messagesElements = props.state.messages
    .map(el => <Message message={el.message} id={el.id} />);

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