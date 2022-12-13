import { AvatarType, DialogType, MessageType } from 'pages/dialogsPage/types';

import { sendMessage } from './dialogsReducer';

export type DialogsReducerStateType = {
  dialogs: DialogType[];
  messages: MessageType[];
  avatars: AvatarType[];
};

type SendDialogMessageActionType = ReturnType<typeof sendMessage>;

export type DialogsReducerActionsType = SendDialogMessageActionType;
