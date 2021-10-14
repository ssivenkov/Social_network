import { sendMessage, updateNewMessageText } from "../../redux/reducers/dialogsReducer";
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

type MapDispatchToPropsType = {
    updateNewMessageText: (text: string) => void
    sendMessage: () => void
}

export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType;

let mapStateToProps = (state: RootStateType): MapStateToPropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        avatars: state.dialogsPage.avatars,
        newMessageTextBody: state.dialogsPage.newMessageTextBody,
        isAuth: state.auth.isAuth,
    };
};

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        updateNewMessageText: (text: string) => {
            dispatch(updateNewMessageText(text));
        },
        sendMessage: () => {
            dispatch(sendMessage());
        },
    };
};

export const DialogsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, RootStateType>
(mapStateToProps, mapDispatchToProps)(Dialogs);