import { initializedSuccess } from './appReducer';

export type AppReducerStateType = {
  initialized: boolean;
};

type SetUserDataActionType = ReturnType<typeof initializedSuccess>;

export type AppReducerActionsType = SetUserDataActionType;
