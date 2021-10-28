import React from "react";
import s from "./Message.module.scss";

type messagePropsType = {
  message: string
  id: number
}

const Message = (props: messagePropsType) => {
  return (
    <div>
      <div className={s.message}>{props.message}</div>
    </div>
  );
};

export default Message;