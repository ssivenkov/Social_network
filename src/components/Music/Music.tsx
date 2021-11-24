import React from "react";
import s from "./Music.module.scss"

const Music = () => {
    return (
        <div className={s.container}>
            <iframe width="412" height="232" src="https://www.youtube.com/embed/7NOSDKb0HlU"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={s.roundBorderLeft}>
            </iframe>
            <iframe width="412" height="232" src="https://www.youtube.com/embed/_daTfgc4u3k"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={s.roundBorderRight}>
            </iframe>
            <iframe width="412" height="232" src="https://www.youtube.com/embed/5yx6BWlEVcY"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
            </iframe>
            <iframe width="412" height="232" src="https://www.youtube.com/embed/zPNi78sVbio"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
            </iframe>
        </div>
    )
}

export default Music;