import React from "react";
import s from './Post.module.css';

type PostType = {
    message: string
    likesCount: number
}

export const Post = (props: PostType) => {
    return (
        <div className={s.post_item}>
            <div className={s.avatar}>
                <img
                    src="https://i.pinimg.com/736x/3f/47/b3/3f47b39a801290271ad789d1ecc053cc.jpg"
                    alt=""/>
            </div>
            <div className={s.textBlock}>
                <p className={s.userMessage}>{props.message}</p>
                <div className={s.likesWrapper}>
                    <span>likes: <span className={s.likesCount}>{props.likesCount}</span></span>
                </div>
            </div>
        </div>
    )
}