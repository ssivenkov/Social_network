import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.scss";
import { HeaderPropsType } from "./HeaderContainer";

export const Header = (props: HeaderPropsType) => {
    return (
        <header className={s.header}>
            <img src="https://mir-s3-cdn-cf.behance.net/projects/max_808/7126be64448945.Y3JvcCw1MjEwLDQwNzgsMCw0MjQ.png"
                 alt=""/>

            <div className={s.loginBlock}>
                {props.isAuth ?
                    <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
                    : <NavLink to={"/login"}>Login</NavLink>}
            </div>
        </header>
    )
}