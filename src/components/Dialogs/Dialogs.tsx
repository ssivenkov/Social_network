import React, { ChangeEvent } from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";
import AvatarItem from "./AvatarsItem/AvatarsItem";
import { DialogsPropsType } from "./DialogsContainer";
import { Redirect } from "react-router-dom";

export const Dialogs = (props: DialogsPropsType) => {
    let avatarsElements = props.avatars
        .map(el => <AvatarItem key={el.id} link={el.link} id={el.id}/>);

    let dialogsElements = props.dialogs
        .map(el => <DialogItem key={el.id} name={el.name} id={el.id}/>);

    let messagesElements = props.messages
        .map(el => <Message key={el.id} message={el.message} id={el.id}/>);

    const newMessageTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value;
        props.updateNewMessageText(text);
    }

    const sendMessage = () => {props.sendMessage()}

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {avatarsElements}
            </div>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div className={s.inputContainer}>
          <textarea value={props.newMessageTextBody}
                    onChange={newMessageTextHandler}
                    className={s.input}
                    placeholder="Enter answer"/>
                    <button className={s.sendButton}
                            onClick={sendMessage}
                    >Send
                    </button>
                </div>
            </div>
        </div>
    );
};