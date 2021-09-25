const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";

export type UserType = {
  followed: boolean
  id: number
  name: string
  photos: {
    small: string | null | undefined,
    large: string | null | undefined,
  }
  status: string | null
  uniqueUrlName: string | null
}

export type UsersStateType = {
  users: Array<UserType>
}

let initialState = {
  users: [],
};

const userReducer = (state: UsersStateType = initialState, action: any): UsersStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return {...user, followed: true};
          } else return user;
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return {...user, followed: false};
          } else return user;
        }),
      };
    case SET_USERS: {
      return {...state, users: [...action.users]};
    }
    default:
      return state;
  }
};

export const followAC = (userId: number) => ({type: FOLLOW, userId});
export const unFollowAC = (userId: number) => ({type: UNFOLLOW, userId});
export const setUsersAC = (users: Array<UserType>) => ({type: SET_USERS, users});

export default userReducer;