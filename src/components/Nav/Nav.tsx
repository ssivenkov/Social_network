import React from "react";
import {NavLink} from "react-router-dom";
import s from './Nav.module.css';

export const Nav = () => {
    return (
        <nav className={s.nav}>
            <div className={s.nav_section}>
                <div className={`${s.item}`}>
                    <NavLink activeClassName={s.active} to="/profile">Profile</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink activeClassName={s.active} to="/dialogs">Messages</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink activeClassName={s.active} to="/news">News</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink activeClassName={s.active} to="/music">Music</NavLink>
                </div>
                <div className={`${s.item} ${s.settings}`}>
                    <NavLink activeClassName={s.activeSettings} to="/settings">Settings</NavLink>
                </div>
            </div>
        </nav>
    )
}