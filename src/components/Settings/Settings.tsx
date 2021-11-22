import React from "react";
import s from "./Settings.module.scss"
import { NavLink } from "react-router-dom";

type SettingsPropsType = {
    isOwner: number | null
    logout: () => void
}

export const Settings: React.FC<SettingsPropsType> = ({isOwner, logout}) => {
    return (
        <div>
            {isOwner
                ? <NavLink onClick={logout} className={s.button} to={"/login"}>Log out</NavLink>
                : <span>Settings</span>
            }
        </div>
    )
}