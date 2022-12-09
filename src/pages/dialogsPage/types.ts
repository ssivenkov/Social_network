export type DialogType = {
  id: number;
  name: string;
};

export type MessageType = {
  id: number;
  message: string;
};

export type AvatarType = {
  id: number;
  link: string;
};

export type MapStateToPropsType = {
  dialogs: DialogType[];
  messages: MessageType[];
  avatars: AvatarType[];
};

export type MapDispatchToPropsType = {
  sendMessage: (newMessageBody: string) => void;
};

export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType;

export type FormDataType = {
  newMessageBody: string;
};
