import React from "react";
import s from "./Message.module.scss";

type messagePropsType = {
  message: string
  id: number
}

const Message: React.FC<messagePropsType> = ({message, id}) => {
  return (
    <div>
      <div className={s.message}>{message}</div>
    </div>
  );
};

export default Message;