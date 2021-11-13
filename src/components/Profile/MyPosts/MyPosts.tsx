import React from "react";
import s from "./MyPosts.module.scss";
import style from "./MyPosts.module.scss";
import { Post } from "./Post/Post";
import { MyPostsPropsType } from "./MyPostsContainer";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../../utils/validators/validator";
import { Textarea } from "../../common/FormsControls/FormsControls";

type FormDataType = {
    newPostBody: string
}

const maxLength100 = maxLengthCreator(100);

const NewPostForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field
                    type={"text"}
                    name={"newPostBody"}
                    component={Textarea}
                    validate={[required, maxLength100]}
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

export const MyPosts = React.memo((props: MyPostsPropsType) => {
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
})