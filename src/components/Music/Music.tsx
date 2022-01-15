import React from "react";
import s from "./Music.module.scss"

const Music = () => {
    return (
        <div className={s.container}>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/GsiKHJtSFyg"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={s.roundBorderLeft}
            >
            </iframe>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/lSAz2ONC1rk"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={s.roundBorderRight}
            >
            </iframe>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/3oHhEx7voLs"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
            </iframe>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/KB15PmfhvBY"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
            </iframe>
        </div>
    )
}

export default Music;