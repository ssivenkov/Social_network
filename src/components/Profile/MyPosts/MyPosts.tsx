import React from "react";
import s from "./MyPosts.module.scss";
import style from "./MyPosts.module.scss";
import { Post } from "./Post/Post";
import { MyPostsCommonPropsType, MyPostsConnectPropsType } from "./MyPostsContainer";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../../utils/validators/validator";
import { Textarea } from "../../common/FormsControls/FormsControls";
import Button from "../../common/Button/Button";

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
                <Button type={"submit"}
                        className={s.sendPostBtn}>
                    Send
                </Button>
            </div>
        </form>
    )
}

const NewPostReduxForm = reduxForm<FormDataType>({form: "post"})(NewPostForm);

export const MyPosts = React.memo((props: MyPostsConnectPropsType & MyPostsCommonPropsType) => {
    let postsElements = props.posts.map((post, index) =>
        <Post key={index}
              message={post.message}
              likesCount={post.likesCount}
              userAvatar={props.userAvatar}
        />,
    );

    const addNewPost = (formData: FormDataType) => {
        props.addPost(formData.newPostBody);
    }

    if (!props.isOwner) return null;
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