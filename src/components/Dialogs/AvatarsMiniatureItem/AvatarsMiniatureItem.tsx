import React from "react";
import s from "./AvatarsMiniatureItem.module.css";
import { AvatarItemPropsType } from "../AvatarsItem/AvatarsItem";

const AvatarMiniatureItem = (props: AvatarItemPropsType) => {
  return (
    <div className={s.avatarContainer}><img className={s.avatar} src={props.link} alt="" /></div>
  );
};

export default AvatarMiniatureItem;