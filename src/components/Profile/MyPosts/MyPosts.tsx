import React, { ChangeEvent } from "react";
import s from "./MyPosts.module.css";
import { Post } from "./Post/Post";

export type PostsType = {
  id: number
  message: string
  likesCount: number
}

export type PostsStateType = {
  posts: Array<PostsType>
  messageForNewPost: string
}

export type Posts = {
  state: PostsStateType
  addPost: (postText: string) => void
  updateNewPostText: (newText: string) => void
  message: string
}

export const MyPosts = (props: Posts) => {
  let postsElements = props.state.posts
    .map((p: PostsType) => <Post key={p.id}
                                 message={p.message}
                                 likesCount={p.likesCount} />);
  const addPost = function() {
    props.addPost(props.message);
  };

  const newTextChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) =>
    props.updateNewPostText(e.currentTarget.value);

  return (
    <div className={s.myPostsSection}>
      <h3 className={s.myPostsTitle}>My posts</h3>
      <div className={s.newPostSection}>
        <textarea value={props.message}
                  onChange={newTextChangeHandler}
                  className={s.newPostCreateField}
                  placeholder="Share your news here ..." />
        <button onClick={addPost} className={s.sendNewsBtn}>Send</button>
      </div>
      <div className={s.postsListSection}>
        {postsElements}
      </div>
    </div>
  );
};