import React from "react";
import s from './Message.module.css'

type messagePropsType = {
    message: string
    id: number
}

const Message = (props: messagePropsType) => {
    return <div className={s.message}>{props.message}</div>
}

export default Message;