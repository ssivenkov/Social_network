import React from "react";
import s from "./ProfileInfo.module.css";
import { Preloader } from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/user.png";
import { ProfileType } from "../../../redux/reducers/profileReducer";

type ProfileInfoPropsType = {
    profile: null | ProfileType
}

export const ProfileInfo = (props: ProfileInfoPropsType) => {
    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div>
            <div>
                <img
                    className={s.img_title}
                    src="https://w-dog.ru/wallpapers/10/19/426855838571046/gory-vershiny-dolina-reka-les-priroda.jpg"
                    alt=""
                />
            </div>
            <div className={s.user_info_section}>
                <div>
                    <img
                        className={s.user_avatar}
                        src={props.profile.photos.large ? props.profile.photos.large : userPhoto}
                        alt={"User avatar " + props.profile.fullName}
                    />
                </div>
                <div>
                    <div className={s.user_name}>{props.profile.fullName ? props.profile.fullName : "Name hidden"}</div>
                    <div className={s.user_desc}>
                        <div>{props.profile.lookingForAJob === true ? "Looking for a job" : ""}</div>
                        <div>{props.profile.lookingForAJobDescription ? props.profile.lookingForAJobDescription : ""}</div>
                        <div>{props.profile.aboutMe ? "About me: " + props.profile.aboutMe : ""}</div>
                        {
                            props.profile.contacts.facebook
                            || props.profile.contacts.website
                            || props.profile.contacts.vk
                            || props.profile.contacts.twitter
                            || props.profile.contacts.instagram
                            || props.profile.contacts.youtube
                            || props.profile.contacts.github
                            || props.profile.contacts.mainLink
                                ? <div>Contacts:
                                    <div>
                                        <div>{props.profile.contacts.facebook ? "Facebook: " + props.profile.contacts.facebook : ""}</div>
                                        <div>{props.profile.contacts.website ? "Website: " + props.profile.contacts.website : ""}</div>
                                        <div>{props.profile.contacts.vk ? "VK: " + props.profile.contacts.vk : ""}</div>
                                        <div>{props.profile.contacts.twitter ? "Twitter: " + props.profile.contacts.twitter : ""}</div>
                                        <div>{props.profile.contacts.instagram ? "Instagram: " + props.profile.contacts.instagram : ""}</div>
                                        <div>{props.profile.contacts.youtube ? "YouTube: " + props.profile.contacts.youtube : ""}</div>
                                        <div>{props.profile.contacts.github ? "GitHub: " + props.profile.contacts.github : ""}</div>
                                        <div>{props.profile.contacts.mainLink ? "Main link: " + props.profile.contacts.mainLink : ""}</div>
                                    </div>
                                </div>
                                : ""
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};