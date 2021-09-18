import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Nav.module.css";
import { AvatarType } from "../Dialogs/DialogsContainer";
import AvatarMiniatureItem from "../Dialogs/AvatarsMiniatureItem/AvatarsMiniatureItem";
import StoreContext from "../../StoreContext";

export type NavStateType = {
  friends: Array<AvatarType>
}

/*type NavProps = {
  state: NavStateType
}*/

export const Nav = (/*props: NavProps*/) => {
  return (
    <StoreContext.Consumer>{
      (store) => {
        let state = store.getState();
        let friendsElements = state.sidebarFriends.friends
          .map((el: AvatarType) => <AvatarMiniatureItem key={el.id} link={el.link} id={el.id} />);

        return <nav className={s.nav}>
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
            <div className={`${s.item} ${s.margin}`}>
              <NavLink activeClassName={s.activeSettings} to="/settings">Settings</NavLink>
            </div>
            <div className={`${s.item} ${s.margin}`}>
              <NavLink className={s.bigFontSize} activeClassName={s.activeFriends} to="/friends">Friends</NavLink>
              <div className={s.friendsContainer}>
                {friendsElements}
              </div>
            </div>
          </div>
        </nav>
      }
    }
    </StoreContext.Consumer>
  );
};