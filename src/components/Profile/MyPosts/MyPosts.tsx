import React from "react";
import s from "./MyPosts.module.css";
import { Post } from "./Post/Post";

type PostsTypes = {
  id: number
  message: string
  likesCount: number
}

export type PostsStateType = {
  posts: Array<PostsTypes>
}

export type Posts = {
  state: PostsStateType
}

export const MyPosts = (props: Posts) => {
  let postsElements = props.state.posts
    .map(p => <Post message={p.message} likesCount={p.likesCount} />);

  return (
    <div className={s.my_posts_section}>
      <h3 className={s.my_posts_title}>My posts</h3>
      <div className={s.new_post_section}>
        <textarea className={s.new_post_create_field} minLength={1} placeholder="Share your news here ..." />
        <button className={s.send_news_btn}>Send</button>
      </div>
      <div className={s.posts_list_section}>
        {postsElements}
      </div>
    </div>
  );
};