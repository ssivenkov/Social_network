import React from "react";
import s from "./MyPosts.module.css";
import { Post } from "./Post/Post";

export const MyPosts = () => {
  return (
    <div className={s.my_posts_section}>
      <p className={s.my_posts_title}>My posts</p>
      <div className={s.new_post_section}>
        <input
          className={s.new_post_create_field}
          type="text"
          placeholder="Type your news ..."
        />
        <button className={s.send_news_btn}>Send</button>
      </div>
      <div className={s.posts_list_section}>
        <Post message="It's my first post." likesCount={20} />
        <Post message="Hello, welcome!" likesCount={15} />
      </div>
    </div>
  );
};
