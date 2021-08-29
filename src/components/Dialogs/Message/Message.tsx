import React from "react";
import s from "./Message.module.css";

type messagePropsType = {
  message: string
  id: number
}

const Message = (props: messagePropsType) => {
  let newTextMessage = React.createRef<HTMLTextAreaElement>();

  let sendMessage = function() {
    alert(newTextMessage.current?.value);
  };

  return (
    <div>
      <div className={s.message}>{props.message}</div>
      <div className={s.inputContainer}>
        <textarea className={s.input}

                  ref={newTextMessage} />
        <button onClick={sendMessage}
                className={`${s.send_news_btn} ${s.sendButton}`}>Send</button>
      </div>
    </div>
  );
};

export default Message;