import React from "react";
import { MyPosts, Posts } from "./MyPosts/MyPosts";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";

export const Profile = (props: Posts) => {
  return (
    <div>
      <ProfileInfo />
      <MyPosts state={props.state}
               dispatch={props.dispatch}
               message={props.message}/>
    </div>
  );
};