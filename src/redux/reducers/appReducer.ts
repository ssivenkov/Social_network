import { ThunkDispatch } from "redux-thunk";
import { RootStateType } from "../reduxStore";
import { getAuthUserData } from "./authReducer";

const INITIALIZED_SUCCESS = "social_network/app/INITIALIZED-SUCCESS";

export type AuthStateType = {
    initialized: boolean
    email: string | null
    login: string | null
    isAuth: boolean
}

let initialState = {
    initialized: false,
    email: null,
    login: null,
    isAuth: false,
}

type SetUserDataActionType = ReturnType<typeof initializedSuccess>

export type InitializeActionsType = SetUserDataActionType

export const appReducer = (state: AuthStateType = initialState, action: InitializeActionsType): AuthStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }
        default:
            return state;
    }
};

export const initializedSuccess = () =>
    ({type: INITIALIZED_SUCCESS} as const);

export const initializeApp = () => {
    return (dispatch: ThunkDispatch<RootStateType, unknown, InitializeActionsType>) => {
        let promise = dispatch(getAuthUserData());
        Promise.all([promise])
            .then(() => {
            dispatch(initializedSuccess());
        });
    }
}

export default appReducer;