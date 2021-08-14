import React from "react";
import s from "./AvatarsItem.module.css";

export type AvatarItemPropsType = {
  id: number
  link: string
}

const AvatarItem = (props: AvatarItemPropsType) => {
  return (
    <div><img className={s.avatar} src={props.link} alt="" /></div>
  );
};

export default AvatarItem;