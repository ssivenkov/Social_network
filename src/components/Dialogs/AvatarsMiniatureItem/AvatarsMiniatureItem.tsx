import React from "react";
import s from "./AvatarsMiniatureItem.module.scss";
import { AvatarItemPropsType } from "../AvatarsItem/AvatarsItem";

const AvatarMiniatureItem: React.FC<AvatarItemPropsType> = ({link}) => {
  return (
    <div className={s.avatarContainer}><img className={s.avatar} src={link} alt="" /></div>
  );
};

export default AvatarMiniatureItem;