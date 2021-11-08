import { AuthAPI } from "../../api/API";
import { ThunkDispatch } from "redux-thunk";
import { RootStateType } from "../reduxStore";
import { FormAction, stopSubmit } from "redux-form";

const SET_USER_DATA = "SET-USER-DATA"

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
    return (dispatch: ThunkDispatch<RootStateType, unknown, AuthActionsType>) => {
        return AuthAPI.me()
            .then(data => {
                if (data.resultCode === 0) {
                    let {id, email, login} = data.data;
                    dispatch(setAuthUserData(id, email, login, true));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export const login = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch: ThunkDispatch<RootStateType, unknown, FormAction>) => {
        AuthAPI.login(email, password, rememberMe)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(getAuthUserData());
                } else {
                    let message = data.messages.length > 0 ? data.messages[0] : "Some error";
                    dispatch(stopSubmit("login", {_error: message}));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export const logout = () => {
    return (dispatch: ThunkDispatch<RootStateType, unknown, AuthActionsType>) => {
        AuthAPI.logout()
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(setAuthUserData(null, null, null, false));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export default authReducer;