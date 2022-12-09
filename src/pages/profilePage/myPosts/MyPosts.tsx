import React, { memo } from 'react';

import { nanoid } from 'nanoid';

import AddPostForm from './addPostForm/AddPostForm';
import { AddPostFormDataType } from './addPostForm/types';
import styles from './myPosts.module.scss';
import { Post } from './post/Post';
import { MyPostsCommonPropsType, MyPostsConnectPropsType } from './types';

export const MyPosts = memo((props: MyPostsConnectPropsType & MyPostsCommonPropsType) => {
  const postsElements = props.posts.map((post) => {
    const { likesCount, message } = post;

    return (
      <Post
        key={nanoid()}
        likesCount={likesCount}
        message={message}
        userAvatar={props.userAvatar}
      />
    );
  });

  const addNewPost = (formData: AddPostFormDataType) => {
    props.addPost(formData.newPostText);
  };

  if (!props.isOwner) return null;

  return (
    <div className={styles.myPostsSection}>
      <h3 className={styles.myPostsTitle}>My posts</h3>
      <div className={styles.newPostSection}>
        <AddPostForm onSubmit={addNewPost} />
      </div>
      <div>{postsElements}</div>
    </div>
  );
});
