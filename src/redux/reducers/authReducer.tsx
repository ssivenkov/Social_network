const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USER_DATA = "SET-USER-DATA"

export type AuthStateType = {
  userId: any | null
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

const authReducer = (state: AuthStateType = initialState, action: any): AuthStateType => {
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

export const setAuthUserData = (userId: any, email: string, login: string) =>
    ({type: SET_USER_DATA, data: {userId, email, login}});

export default authReducer;