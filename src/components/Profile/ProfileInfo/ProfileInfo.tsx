import React from "react";
import s from "./ProfileInfo.module.css";

export const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img
                    className={s.img_title}
                    src="https://storge.pic2.me/cm/2560x1440/474/5845d0fb0f254.jpg"
                    alt=""
                />
            </div>
            <div className={s.user_info_section}>
                <div>
                    <img
                        className={s.user_avatar}
                        src="http://sun9-17.userapi.com/s/v1/ig2/vA5NcCTxJizo_ce97CcVRezF8VEE_9UXJStRXGgbFIvtDIPramNHSZEhUKYbr-U3BTVf5eay6AuX2A9FMTQVmhZw.jpg?size=200x0&quality=96&crop=194,0,674,674&ava=1"
                        alt=""
                    />
                </div>
                <div>
                    <div className={s.user_name}>User name</div>
                    <div className={s.user_desc}>
                        <p>Date of Birth: date</p>
                        <p>City: city</p>
                        <p>Education: education</p>
                        <p>Web Site: website</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
