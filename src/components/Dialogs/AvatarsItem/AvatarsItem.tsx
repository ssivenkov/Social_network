import React from "react";
import s from "./AvatarsItem.module.scss";

export type AvatarItemPropsType = {
  id: number
  link: string
}

const AvatarItem: React.FC<AvatarItemPropsType> = ({id, link}) => {
  return (
    <div><img className={s.avatar} src={link} alt="" /></div>
  );
};

export default AvatarItem;