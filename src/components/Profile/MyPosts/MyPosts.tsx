import React, { ChangeEvent } from "react";
import s from "./MyPosts.module.css";
import { Post } from "./Post/Post";
import { MyPostsPropsType } from "./MyPostsContainer";

export const MyPosts = (props: MyPostsPropsType) => {
  const onAddPost = function() {
    props.addPost();
  };

  const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let text = e.currentTarget.value;
    props.updateNewPostText(text);
  };

  let postsElements = props.posts.map((p) =>
    <Post key={p.id}
          message={p.message}
          likesCount={p.likesCount}
    />
  );

  return (
    <div className={s.myPostsSection}>
      <h3 className={s.myPostsTitle}>My posts</h3>
      <div className={s.newPostSection}>
        <textarea value={props.messageForNewPost}
                  onChange={onPostChange}
                  className={s.newPostCreateField}
                  placeholder="Share your news here ..." />
        <button onClick={onAddPost} className={s.sendNewsBtn}>Send</button>
      </div>
      <div className={s.postsListSection}>
        {postsElements}
      </div>
    </div>
  );
};