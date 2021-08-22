import React from "react";
import { MyPosts, Posts } from "./MyPosts/MyPosts";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";

export const Profile = (props: Posts) => {
  return (
    <div>
      <ProfileInfo />
      <MyPosts state={props.state}
               addPost={props.addPost}
               updateNewPostText={props.updateNewPostText}
               message={props.message}/>
    </div>
  );
};