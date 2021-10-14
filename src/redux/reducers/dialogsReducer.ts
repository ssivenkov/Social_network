import { AvatarType, DialogType, MessageType } from "../../components/Dialogs/DialogsContainer";

const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_DIALOG_MESSAGE = "SEND-DIALOG-MESSAGE";

export type DialogsStateType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    avatars: Array<AvatarType>
    newMessageTextBody: string
}

let initialState = {
    dialogs: [
        {id: 1, name: "Dimych"},
        {id: 2, name: "Valera"},
        {id: 3, name: "Katya"},
        {id: 4, name: "Andrei"},
        {id: 5, name: "Viktor"},
    ],
    messages: [
        {id: 1, message: "Ha"},
        {id: 2, message: "Yo!"},
        {id: 3, message: "How are you ?"},
        {id: 4, message: "This social network is awesome!"},
        {id: 5, message: "Go"},
    ],
    newMessageTextBody: "",
    avatars: [
        {id: 1, link: "https://i.pinimg.com/736x/3f/47/b3/3f47b39a801290271ad789d1ecc053cc.jpg"},
        {id: 2, link: "https://img.joinfo.com/i/2018/06/800x0/5b30ce1e882dc.jpg"},
        {id: 3, link: "https://mobimg.b-cdn.net/v3/fetch/62/620e78234f747fa272d1bbb5a9032467.jpeg"},
        {id: 4, link: "https://wallbox.ru/resize/800x480/wallpapers/main/201522/344385ce96c7f38.jpg"},
        {id: 5, link: "https://www.ejin.ru/wp-content/uploads/2019/05/smeshnoj-kotik-oblizyvaetsja.jpg"},
    ],
}

type UpdateNewMessageBodyActionType = ReturnType<typeof updateNewMessageText>
type SendDialogMessageActionType = ReturnType<typeof sendMessage>

export type DialogsActionsType = UpdateNewMessageBodyActionType
    | SendDialogMessageActionType

const dialogsReducer = (state: DialogsStateType = initialState, action: DialogsActionsType): DialogsStateType => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY: {
            return {
                ...state,
                newMessageTextBody: action.newMessageText,
            };
        }
        case SEND_DIALOG_MESSAGE: {
            let newMessageTextBody = state.newMessageTextBody;
            return {
                ...state,
                newMessageTextBody: "",
                messages: [...state.messages, {id: 6, message: newMessageTextBody}],
            };
        }
        default:
            return state;
    }
};

export const updateNewMessageText = (newText: string) =>
    ({type: UPDATE_NEW_MESSAGE_BODY, newMessageText: newText} as const)
export const sendMessage = () =>
    ({type: SEND_DIALOG_MESSAGE} as const)

export default dialogsReducer;