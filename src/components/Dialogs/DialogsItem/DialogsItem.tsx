import React from "react";
import { NavLink } from "react-router-dom";
import s from "./DialogsItem.module.css";

type DialogItemPropsType = {
  id: number
  name: string
}

const DialogItem = (props: DialogItemPropsType) => {
  let path = "/dialogs/" + props.id;
  return (
    <NavLink to={path} activeClassName={s.active} className={s.dialog}>
      {props.name}
    </NavLink>
  );
};

export default DialogItem;