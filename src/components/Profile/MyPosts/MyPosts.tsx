import React from "react";
import s from "./MyPosts.module.css";
import { Post } from "./Post/Post";
import { MyPostsPropsType } from "./MyPostsContainer";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { maxLengthCreator, required } from "../../../utils/validators/validator";
import { Textarea } from "../../common/FormsControls/FormsControls";
import style from "./MyPosts.module.css";

type FormDataType = {
    newPostBody: string
}

const maxLength10 = maxLengthCreator(10);

const NewPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    type={"text"}
                    name={"newPostBody"}
                    component={Textarea}
                    validate={[required, maxLength10]}
                    placeholder={"Share your news here ..."}
                    className={style.newPostCreateField}
                />
            </div>
            <div>
                <button type={"submit"}
                        className={s.sendPostBtn}>
                    Send
                </button>
            </div>
        </form>
    )
}

const NewPostReduxForm = reduxForm<FormDataType>({form: "post"})(NewPostForm)

export const MyPosts = (props: MyPostsPropsType) => {
    let postsElements = props.posts.map((p) =>
        <Post key={p.id}
              message={p.message}
              likesCount={p.likesCount}
        />,
    );

    const addNewPost = (formData: FormDataType) => {
        props.addPost(formData.newPostBody)
    }

    return (
        <div className={s.myPostsSection}>
            <h3 className={s.myPostsTitle}>My posts</h3>
            <div className={s.newPostSection}>
                <NewPostReduxForm onSubmit={addNewPost}/>
            </div>
            <div className={s.postsListSection}>
                {postsElements}
            </div>
        </div>
    );
};