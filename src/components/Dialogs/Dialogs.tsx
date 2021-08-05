import React from "react";
import {NavLink} from "react-router-dom";
import s from './Dialogs.module.css'

type DialogItemPropsType = {
    name: string,
    id: number
}
const DialogItem = (props: DialogItemPropsType) => {
    let path = "/dialogs/" + props.id;
    return (
        <NavLink to={path} activeClassName={s.active} className={s.dialog}>
            {props.name}
        </NavLink>
    )
}

type messagePropsType = {
    message: string
}
const Message = (props: messagePropsType) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

export const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <DialogItem name="Dimych" id={1}/>
                <DialogItem name="Valera" id={2}/>
                <DialogItem name="Katya" id={3}/>
                <DialogItem name="Andrei" id={4}/>
                <DialogItem name="Viktor" id={5}/>
            </div>
            <div className={s.messages}>
                <Message message="Ha"/>
                <Message message="Yo!"/>
                <Message message="How are you ?"/>
                <Message message="This social network is awesome!"/>
                <Message message="Go"/>
            </div>
        </div>
    )
}