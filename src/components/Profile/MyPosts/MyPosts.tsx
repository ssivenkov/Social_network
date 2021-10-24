import React, { ChangeEvent } from "react";
import s from "./MyPosts.module.css";
import { Post } from "./Post/Post";
import { MyPostsPropsType } from "./MyPostsContainer";
import { reduxForm, Field, InjectedFormProps } from "redux-form";

type PostDataType = {
    message: string
}

const PostForm: React.FC<InjectedFormProps<PostDataType>> = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    type={"text"}
                    name={"post"}
                    component={"input"}
                    placeholder="Share your news here ..."
                    className={s.newPostCreateField}
                />
            </div>
            <div>
                <button type="submit"
                        className={s.sendNewsBtn}
                >
                    Send
                </button>
            </div>
        </form>
    )
}

const PostReduxForm = reduxForm<PostDataType>({form: "post"})(PostForm)

export const MyPosts = (props: MyPostsPropsType) => {
    const onAddPost = function () {
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
        />,
    );

    const onSubmit = (formData: PostDataType) => {
        console.log(formData)
    }

    return (
        <div className={s.myPostsSection}>
            <h3 className={s.myPostsTitle}>My posts</h3>
            <div className={s.newPostSection}>
                <PostReduxForm onSubmit={onSubmit}/>
                {/*<textarea value={props.messageForNewPost}
                 onChange={onPostChange}
                 className={s.newPostCreateField}
                 placeholder="Share your news here ..." />
                 <button onClick={onAddPost} className={s.sendNewsBtn}>Send</button>*/}
            </div>
            <div className={s.postsListSection}>
                {postsElements}
            </div>
        </div>
    );
};