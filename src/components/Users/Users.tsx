import React from "react";
import s from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import { NavLink } from "react-router-dom";
import { UserType } from "../../redux/reducers/usersReducer";
import { usersAPI } from "../../api/api";

type UsersType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    followingInProgress: Array<number>
}

export let Users = (props: UsersType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div>
        <div>
            {pages.map(p => {
                return <span onClick={() => {props.onPageChanged(p)}}
                             className={props.currentPage === p ? s.selectPage : ""}>{p}</span>
            })}
        </div>

        {
            props.users.map(user => <div className={s.container} key={user.id}>
                <div>
                    <div>
                        <NavLink to={"/profile/" + user.id}>
                            <img className={s.avatar} src={user.photos.small != null
                                ? user.photos.small
                                : userPhoto} alt=""/>
                        </NavLink>
                    </div>
                    <div>
                        {user.followed
                            ? <button disabled={props.followingInProgress.some(id => id === user.id)}
                                      className={s.button}
                                      onClick={() => {
                                          props.toggleFollowingProgress(true, user.id);
                                          usersAPI.unFollow(user.id)
                                              .then(data => {
                                                  if (data.resultCode === 0) {
                                                      props.unFollow(user.id)
                                                  }
                                                  props.toggleFollowingProgress(false, user.id);
                                              })
                                              .catch((error) => {
                                                  console.log(error);
                                              });
                                          props.unFollow(user.id)
                                      }}>Unfollow</button>
                            : <button disabled={props.followingInProgress.some(id => id === user.id)}
                                      className={s.button}
                                      onClick={() => {
                                          props.toggleFollowingProgress(true, user.id);
                                          usersAPI.follow(user.id)
                                              .then(data => {
                                                  if (data.resultCode === 0) {
                                                      props.follow(user.id)
                                                  }
                                                  props.toggleFollowingProgress(false, user.id);
                                              })
                                              .catch((error) => {
                                                  console.log(error);
                                              });
                                      }}>Follow</button>
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
            </div>)
        }
    </div>
}