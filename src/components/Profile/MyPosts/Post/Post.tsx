import React from "react";
import s from './Post.module.scss';

type PostType = {
    message: string
    likesCount: number
}

export const Post: React.FC<PostType> = ({message, likesCount}) => {
    return (
        <div className={s.post_item}>
            <div className={s.avatar}>
                <img
                    src="http://sun9-17.userapi.com/s/v1/ig2/vA5NcCTxJizo_ce97CcVRezF8VEE_9UXJStRXGgbFIvtDIPramNHSZEhUKYbr-U3BTVf5eay6AuX2A9FMTQVmhZw.jpg?size=200x0&quality=96&crop=194,0,674,674&ava=1"
                    alt=""/>
            </div>
            <div className={s.textBlock}>
                <p className={s.userMessage}>{message}</p>
                <div className={s.likesWrapper}>
                    <span>likes: <span className={s.likesCount}>{likesCount}</span></span>
                </div>
            </div>
        </div>
    )
}