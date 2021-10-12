import { sendMessageActionCreator, updateNewMessageTextActionCreator } from "../../redux/reducers/dialogsReducer";
import { connect } from "react-redux";
import { Dialogs } from "./Dialogs";
import { Dispatch } from "redux";
import { RootStateType } from "../../redux/reduxStore";

export type DialogType = {
    id: number
    name: string
}

export type MessageType = {
    id: number
    message: string
}

export type AvatarType = {
    id: number
    link: string
}

export type MapStateToPropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    avatars: Array<AvatarType>
    newMessageTextBody: string
    isAuth: boolean
}

type DispatchToPropsType = {
    updateNewMessageText: (text: string) => void
    sendMessage: () => void
}

export type DialogsPropsType = MapStateToPropsType & DispatchToPropsType;

let mapStateToProps = (state: RootStateType): MapStateToPropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        avatars: state.dialogsPage.avatars,
        newMessageTextBody: state.dialogsPage.newMessageTextBody,
        isAuth: state.auth.isAuth,
    };
};

let mapDispatchToProps = (dispatch: Dispatch): DispatchToPropsType => {
    return {
        updateNewMessageText: (text: string) => {
            dispatch(updateNewMessageTextActionCreator(text));
        },
        sendMessage: () => {
            dispatch(sendMessageActionCreator());
        },
    };
};

export const DialogsContainer = connect<MapStateToPropsType, DispatchToPropsType, {}, RootStateType>
(mapStateToProps, mapDispatchToProps)(Dialogs);