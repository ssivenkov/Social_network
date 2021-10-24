import React, { ChangeEvent } from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";
import AvatarItem from "./AvatarsItem/AvatarsItem";
import { DialogsPropsType } from "./DialogsContainer";
import { Field, InjectedFormProps, reduxForm } from "redux-form";

type MessageDataType = {
    message: string
}

const NewMessageForm: React.FC<InjectedFormProps<MessageDataType>> = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    type={"text"}
                    name={"newMessageBody"}
                    component={"textarea"}
                    placeholder="enter your message"
                    className={s.input}
                />
            </div>
            <div>
                <button type={"submit"}
                        className={s.sendButton}
                >Send
                </button>
            </div>
        </form>
    )
}

const NewMessageReduxForm = reduxForm<MessageDataType>({form: "dialogAddMessageForm"})(NewMessageForm)

export const Dialogs = (props: DialogsPropsType) => {
    let avatarsElements = props.avatars
        .map(el => <AvatarItem key={el.id} link={el.link} id={el.id}/>);

    let dialogsElements = props.dialogs
        .map(el => <DialogItem key={el.id} name={el.name} id={el.id}/>);

    let messagesElements = props.messages
        .map(el => <Message key={el.id} message={el.message} id={el.id}/>);

    /*const newMessageTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value;
        props.updateNewMessageText(text);
    }

    const sendMessage = () => {props.sendMessage()}*/

    const addNewMessage = (values: any) => {
        props.sendMessage(values.newMessageBody)
    }

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
                    <NewMessageReduxForm onSubmit={addNewMessage}/>
                    {/*<textarea value={props.newMessageTextBody}
                     onChange={newMessageTextHandler}
                     className={s.input}
                     placeholder="Enter answer"/>
                     <button className={s.sendButton}
                     onClick={sendMessage}
                     >Send
                     </button>*/}
                </div>
            </div>
        </div>
    );
};