import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.scss";
import { HeaderPropsType } from "./HeaderContainer";
import AnonymousUserPhoto from "../../assets/images/user.png";

export const Header: React.FC<HeaderPropsType> = ({isAuth, login, logout, userAvatar}) => {
    return (
        <header className={s.header}>
            <img src="https://mir-s3-cdn-cf.behance.net/projects/max_808/7126be64448945.Y3JvcCw1MjEwLDQwNzgsMCw0MjQ.png"
                 alt=""/>

            <div className={s.loginBlock}>
                {isAuth ?
                    <div className={s.infoContainer}>
                        <div className={s.avatar}>
                            <img
                                src={userAvatar || AnonymousUserPhoto}
                                alt="user avatar"/>
                        </div>
                        {login} <NavLink onClick={logout} to={"/login"}>Log out</NavLink>
                    </div>
                    : <NavLink to={"/login"}>Login</NavLink>}
            </div>
        </header>
    )
}