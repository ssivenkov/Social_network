import cat1 from 'assets/images/cat1.jpg';
import cat2 from 'assets/images/cat2.jpg';
import cat3 from 'assets/images/cat3.jpg';
import cat4 from 'assets/images/cat4.jpg';
import cat5 from 'assets/images/cat5.jpg';
import { DIALOGS_REDUCER_ACTION } from 'enum/dialogsReducerEnum';

import { DialogsReducerActionsType, DialogsReducerStateType } from './types';

const initialState = {
  dialogs: [
    { id: 1, name: 'Dimych' },
    { id: 2, name: 'Valera' },
    { id: 3, name: 'Katya' },
    { id: 4, name: 'Andrei' },
    { id: 5, name: 'Viktor' },
  ],
  messages: [
    { id: 1, message: 'Hello!' },
    { id: 2, message: 'Yo!' },
    { id: 3, message: 'How are you ?' },
    { id: 4, message: 'This social network is awesome!' },
  ],
  avatars: [
    { id: 1, link: cat1 },
    { id: 2, link: cat2 },
    { id: 3, link: cat3 },
    { id: 4, link: cat4 },
    { id: 5, link: cat5 },
  ],
};

export const dialogsReducer = (
  state: DialogsReducerStateType = initialState,
  action: DialogsReducerActionsType,
): DialogsReducerStateType => {
  switch (action.type) {
    case DIALOGS_REDUCER_ACTION.SEND_DIALOG_MESSAGE: {
      const newMessageTextBody = action.newMessageBody;

      return {
        ...state,
        messages: [
          ...state.messages,
          { id: state.messages.length + 1, message: newMessageTextBody },
        ],
      };
    }
    default:
      return state;
  }
};

export const sendMessage = (newMessageBody: string) =>
  ({ type: DIALOGS_REDUCER_ACTION.SEND_DIALOG_MESSAGE, newMessageBody } as const);
