import { AuthAPI, securityAPI } from "../../api/API";
import { ThunkDispatch } from "redux-thunk";
import { RootStateType } from "../reduxStore";
import { FormAction, stopSubmit } from "redux-form";

const SET_USER_DATA = "social_network/auth/SET-USER-DATA";
const GET_CAPTCHA_URL_SUCCESS = "social_network/auth/GET-CAPTCHA-URL-SUCCESS";

type AuthStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: null | string,
}

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
}

type SetUserDataActionType = ReturnType<typeof setAuthUserData>
type GetCaptchaUrlSuccessType = ReturnType<typeof getCaptchaUrlSuccess>

export type AuthActionsType = SetUserDataActionType | GetCaptchaUrlSuccessType

const authReducer = (state: AuthStateType = initialState, action: AuthActionsType): AuthStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
            }
        case GET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state,
                ...action.payload,
            }
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
export const getCaptchaUrlSuccess = (captchaUrl: string) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl},
} as const);

export const getAuthUserData = () => {
    return async (dispatch: ThunkDispatch<RootStateType, unknown, AuthActionsType>) => {
        try {
            const response = await AuthAPI.me();
            if (response.resultCode === 0) {
                const {id, email, login} = response.data;
                dispatch(setAuthUserData(id, email, login, true));
            }
        } catch (error) {
            console.log(`Error getting auth user data. ${error}`);
        }
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => {
    return async (dispatch: ThunkDispatch<RootStateType, unknown, FormAction>) => {
        try {
            const response = await AuthAPI.login(email, password, rememberMe, captcha);
            if (response.resultCode === 0) {
                await dispatch(getAuthUserData());
            } else {
                if (response.resultCode === 10) {
                    await dispatch(getCaptchaUrl());
                } else {
                    const message = response.messages.length > 0 ? response.messages[0] : "Some error. Please reload page";
                    dispatch(stopSubmit("login", {_error: message}));
                }
            }
        } catch (error) {
            console.log(`Error login. ${error}`);
        }
    }
}

export const getCaptchaUrl = () => {
    return async (dispatch: ThunkDispatch<RootStateType, unknown, AuthActionsType>) => {
        try {
            const response = await securityAPI.getCaptchaUrl();
            const captchaUrl = response.url;
            dispatch(getCaptchaUrlSuccess(captchaUrl));
        } catch (error) {
            console.log(`Error getting captcha image url. ${error}`);
        }
    }
}

export const logout = () => {
    return async (dispatch: ThunkDispatch<RootStateType, unknown, AuthActionsType>) => {
        try {
            const response = await AuthAPI.logout();
            if (response.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        } catch (error) {
            console.log(`Error logout. ${error}`);
        }
    }
}

export default authReducer;