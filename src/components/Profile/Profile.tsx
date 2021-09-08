import React from "react";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { MyPostsContainer, Posts } from "./MyPosts/MyPostsContainer";

export const Profile = (props: Posts) => {
  return (
    <div>
      <ProfileInfo />
      <MyPostsContainer state={props.state}
               dispatch={props.dispatch}
               message={props.message}/>
    </div>
  );
};