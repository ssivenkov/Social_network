import { APP_REDUCER_ACTION } from 'enum/appReducerEnum';
import { ThunkDispatch } from 'redux-thunk';
import { getAuthUserData } from 'store/reducers/authReducer/authReducer';
import { RootStateType } from 'store/types';

import { AppReducerStateType, AppReducerActionsType } from './types';

const initialState = {
  initialized: false,
};

export const appReducer = (
  state: AppReducerStateType = initialState,
  action: AppReducerActionsType,
): AppReducerStateType => {
  switch (action.type) {
    case APP_REDUCER_ACTION.INITIALIZED_SUCCESS: {
      return {
        ...state,
        initialized: true,
      };
    }
    default:
      return state;
  }
};

export const initializedSuccess = () =>
  ({ type: APP_REDUCER_ACTION.INITIALIZED_SUCCESS } as const);

export const initializeApp = () => {
  return (dispatch: ThunkDispatch<RootStateType, unknown, AppReducerActionsType>) => {
    try {
      const promise = dispatch(getAuthUserData());

      promise.then(() => {
        dispatch(initializedSuccess());
      });
    } catch (error) {
      console.log(`Error initialization app. ${error}`);
    }
  };
};
