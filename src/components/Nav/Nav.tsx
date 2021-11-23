import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Nav.module.scss";
import { AvatarType } from "../Dialogs/DialogsContainer";
import AvatarMiniatureItem from "../Dialogs/AvatarsMiniatureItem/AvatarsMiniatureItem";
import { NavPropsType } from "./NavContainer";

export const Nav: React.FC<NavPropsType> = ({friends}) => {
  let friendsElements = friends
    .map((el: AvatarType) => <AvatarMiniatureItem key={el.id} link={el.link} id={el.id} />);

  return <nav className={s.nav}>
    <div className={s.nav_section}>
      <div className={`${s.item}`}>
        <NavLink activeClassName={s.active} to="/profile">Profile</NavLink>
      </div>
      <div className={s.item}>
        <NavLink activeClassName={s.active} to="/dialogs">Messages</NavLink>
      </div>
      <div className={`${s.item}`}>
        <NavLink activeClassName={s.active} to="/users">Users</NavLink>
      </div>
      <div className={`${s.item}`}>
        <NavLink activeClassName={s.activeFriends} to="/friends">Friends</NavLink>
      </div>
      <div className={s.item}>
        <NavLink activeClassName={s.active} to="/music">Music</NavLink>
      </div>
      <div className={`${s.item} ${s.margin}`}>
        <NavLink activeClassName={s.activeSettings} to="/settings">Settings</NavLink>
      </div>
      <div className={s.friendsContainer}>
        {friendsElements}
      </div>
    </div>
  </nav>;
};