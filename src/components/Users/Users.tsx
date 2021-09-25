import React from "react";
import s from "./Users.module.css";
import axios from "axios";
import userPhoto from "../../assets/images/user.png"
import { UsersClassType } from "./UsersContainer";

class Users extends React.Component<UsersClassType> {
  componentDidMount() {
    if (this.props.users.length === 0) {
      axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
        this.props.setUsers(response.data.items);
      });
    }
  }

  render() {
    return <div>
      {this.props.users.map(user => <div className={s.container} key={user.id}>
        <div>
          <div>
            <img className={s.avatar} src={user.photos.small != null
              ? user.photos.small
              : userPhoto} alt=""/>
          </div>
          <div>
            {user.followed
              ? <button className={s.button} onClick={() => {this.props.unFollow(user.id)}}>Unfollow</button>
              : <button className={s.button} onClick={() => {this.props.follow(user.id)}}>Follow</button>
            }
          </div>
        </div>
        <div>
          <div>
            <div className={s.name}>{user.name}</div>
            <div>{user.status}</div>
          </div>
          <div>
            {/*<div>{"user.location.country"}</div>
            <div>{"user.location.city"}</div>*/}
          </div>
        </div>
      </div>)}
    </div>
  }
}

export default Users;