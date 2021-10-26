import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";
import AvatarItem from "./AvatarsItem/AvatarsItem";
import { DialogsPropsType } from "./DialogsContainer";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Textarea } from "../common/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../../utils/validators/validator";

type FormDataType = {
    newMessageBody: string
}

const maxLength100 = maxLengthCreator(100);

const NewMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    type={"text"}
                    name={"newMessageBody"}
                    component={Textarea}
                    validate={[required, maxLength100]}
                    placeholder={"enter your message"}
                    className={s.input}
                />
            </div>
            <div>
                <button type={"submit"}
                        className={s.sendButton}>
                    Send
                </button>
            </div>
        </form>
    )
}

const NewMessageReduxForm = reduxForm<FormDataType>({form: "dialogAddMessageForm"})(NewMessageForm)

export const Dialogs = (props: DialogsPropsType) => {
    let avatarsElements = props.avatars
        .map(el => <AvatarItem key={el.id} link={el.link} id={el.id}/>);

    let dialogsElements = props.dialogs
        .map(el => <DialogItem key={el.id} name={el.name} id={el.id}/>);

    let messagesElements = props.messages
        .map(el => <Message key={el.id} message={el.message} id={el.id}/>);

    const addNewMessage = (formData: FormDataType) => {
        props.sendMessage(formData.newMessageBody)
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
                </div>
            </div>
        </div>
    );
};