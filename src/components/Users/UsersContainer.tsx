import { connect } from "react-redux";
import { followAC, setUsersAC, unFollowAC, UserType } from "../../redux/reducers/usersReducer";
import { RootStateType } from "../../redux/reduxStore";
import Users from "./Users";

type mapStateToUsersPropsType = {
  users:Array<UserType>
}

let mapStateToProps = (state: RootStateType):mapStateToUsersPropsType => {
  return {
    users: state.usersPage.users,
  };
};

type mapDispatchToUsersType = {
  follow: (userId: number) =>void
  unFollow: (userId: number) =>void
  setUsers: (users:  Array<UserType>) =>void
}

export type UsersClassType = mapStateToUsersPropsType & mapDispatchToUsersType;

let mapDispatchToProps = (dispatch: any) => {
  return {
    follow: (userId: number) => {
      dispatch(followAC(userId));
    },
    unFollow: (userId: number) => {
      dispatch(unFollowAC(userId));
    },
    setUsers: (users: Array<UserType>) => {
      dispatch(setUsersAC(users));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);