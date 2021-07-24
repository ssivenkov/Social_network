import React from "react";
import s from './Post.module.css';

type PostType = {
    message: string
    likesCount: number
}

export const Post = (props: PostType) => {
    return (
        <div className={s.post_item}>
            <img
                src="https://i.pinimg.com/736x/3f/47/b3/3f47b39a801290271ad789d1ecc053cc.jpg"
                alt=""/>
            <p>{props.message}</p>
            <div>
                <span>likes: {props.likesCount}</span>
            </div>
        </div>
    )
}