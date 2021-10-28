import React from "react";
import s from './Post.module.scss';

type PostType = {
    message: string
    likesCount: number
}

export const Post = (props: PostType) => {
    return (
        <div className={s.post_item}>
            <div className={s.avatar}>
                <img
                    src="http://sun9-17.userapi.com/s/v1/ig2/vA5NcCTxJizo_ce97CcVRezF8VEE_9UXJStRXGgbFIvtDIPramNHSZEhUKYbr-U3BTVf5eay6AuX2A9FMTQVmhZw.jpg?size=200x0&quality=96&crop=194,0,674,674&ava=1"
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