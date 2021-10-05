const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";

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
  pageSize: number
  totalUsersCount: number
  currentPage: number
}

let initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
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
    case SET_CURRENT_PAGE: {
      return {...state, currentPage: action.currentPage}
    }
    case SET_TOTAL_USERS_COUNT: {
      return {...state, totalUsersCount: action.count}
    }
    default:
      return state;
  }
};

export const followAC = (userId: number) => ({type: FOLLOW, userId});
export const unFollowAC = (userId: number) => ({type: UNFOLLOW, userId});
export const setUsersAC = (users: Array<UserType>) => ({type: SET_USERS, users});
export const setCurrentPageAC = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage});
export const setUsersTotalCountAC = (totalUsersCount: number) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount});

export default userReducer;