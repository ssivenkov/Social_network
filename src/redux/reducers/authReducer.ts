import { authAPI } from "../../api/UsersAPI";
import { Dispatch } from "redux";

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
};

type SetUserDataActionType = {
    type: "SET-USER-DATA"
    data: {
        userId: number
        email: string
        login: string
    }
}

type AuthActionsType = SetUserDataActionType

const authReducer = (state: AuthStateType = initialState, action: AuthActionsType): AuthStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true,
            }
        default:
            return state;
    }
};

export const setAuthUserData = (userId: number, email: string, login: string): SetUserDataActionType =>
    ({type: SET_USER_DATA, data: {userId, email, login}});

export const getAuthUserData = () => (dispatch: Dispatch<AuthActionsType>) => {
    authAPI.me()
        .then(data => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data;
                dispatch(setAuthUserData(id, email, login));
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

export default authReducer;