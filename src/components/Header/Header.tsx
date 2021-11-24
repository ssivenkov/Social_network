import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.scss";
import { HeaderPropsType } from "./HeaderContainer";
import AnonymousUserPhoto from "../../assets/images/user.png";

export const Header: React.FC<HeaderPropsType> = ({isAuth, login, logout, profileSmallPhoto}) => {
    return (
        <header className={s.header}>
            <div className={s.container}>
                <img src="https://mir-s3-cdn-cf.behance.net/projects/max_808/7126be64448945.Y3JvcCw1MjEwLDQwNzgsMCw0MjQ.png"
                     alt=""
                     className={s.logo}
                />

                <div className={s.loginBlock}>
                    {isAuth ?
                        <div className={s.infoContainer}>
                            <span>{login}</span>
                            <div className={s.avatar}>
                                <img
                                    src={profileSmallPhoto || AnonymousUserPhoto}
                                    alt="you small avatar"/>
                            </div>
                            <NavLink onClick={logout} to={"/login"}>Log out</NavLink>
                        </div>
                        : <NavLink to={"/login"}>Login</NavLink>}
                </div>
            </div>
        </header>
    )
}