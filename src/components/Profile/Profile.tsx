import React from "react";
import s from "./Profile.module.css";
import { MyPosts, Posts } from "./MyPosts/MyPosts";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";

export const Profile = (props: Posts) => {
  return (
    <div>
      <ProfileInfo />
      <MyPosts state={props.state} />
    </div>
  );
};