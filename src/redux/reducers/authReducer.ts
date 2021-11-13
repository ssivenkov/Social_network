import { AuthAPI } from "../../api/API";
import { ThunkDispatch } from "redux-thunk";
import { RootStateType } from "../reduxStore";
import { FormAction, stopSubmit } from "redux-form";

const SET_USER_DATA = "social_network/auth/SET-USER-DATA";

export type AuthStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
}

type SetUserDataActionType = ReturnType<typeof setAuthUserData>

export type AuthActionsType = SetUserDataActionType & FormAction

const authReducer = (state: AuthStateType = initialState, action: AuthActionsType): AuthStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
            }
        default:
            return state;
    }
};

export const setAuthUserData = (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
) =>
    ({type: SET_USER_DATA, data: {userId, email, login, isAuth}} as const);

export const getAuthUserData = () => {
    return async (dispatch: ThunkDispatch<RootStateType, unknown, AuthActionsType>) => {
        let response = await AuthAPI.me();
        if (response.resultCode === 0) {
            let {id, email, login} = response.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
    }
}

export const login = (email: string, password: string, rememberMe: boolean) => {
    return async (dispatch: ThunkDispatch<RootStateType, unknown, FormAction>) => {
        let response = await AuthAPI.login(email, password, rememberMe);
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData());
        } else {
            let message = response.messages.length > 0 ? response.messages[0] : "Some error";
            dispatch(stopSubmit("login", {_error: message}));
        }

    }
}

export const logout = () => {
    return async (dispatch: ThunkDispatch<RootStateType, unknown, AuthActionsType>) => {
        let response = await AuthAPI.logout()
        if (response.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    }
}

export default authReducer;