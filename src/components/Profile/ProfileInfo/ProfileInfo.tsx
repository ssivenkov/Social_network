import React from "react";
import s from "./ProfileInfo.module.scss";
import { Preloader } from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/user.png";
import { ProfileType } from "../../../redux/reducers/profileReducer";
import ProfileStatus from "./ProfileStatus"

type ProfileInfoPropsType = {
    profile: null | ProfileType
    isOwner: boolean
    status: string
    updateStatus: (status: string) => void
    savePhoto: (photo: any) => void
}

export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({profile, isOwner, status, updateStatus, savePhoto}) => {
    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: any) => {
        if (e.target.files.length === 1) {
            savePhoto(e.target.files[0]);
        }
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
                <div className={s.user_avatar_section}>
                    <img
                        className={s.user_avatar}
                        src={profile.photos.large || userPhoto}
                        alt={"User avatar " + profile.fullName}
                    />
                    {
                        isOwner && <input type={"file"}
                                          className={s.user_change_avatar_button}
                                          onChange={onMainPhotoSelected}
                        />
                    }
                </div>
                <div>
                    <div className={s.user_name}>{profile.fullName ? profile.fullName : "Name hidden"}</div>
                    <ProfileStatus status={status}
                                   updateStatus={updateStatus}
                    />
                    <div className={s.user_desc}>
                        <div>{profile.lookingForAJob === true ? "Looking for a job" : ""}</div>
                        <div>{profile.lookingForAJobDescription ? profile.lookingForAJobDescription : ""}</div>
                        <div>{profile.aboutMe ? "About me: " + profile.aboutMe : ""}</div>
                        {
                            profile.contacts.facebook
                            || profile.contacts.website
                            || profile.contacts.vk
                            || profile.contacts.twitter
                            || profile.contacts.instagram
                            || profile.contacts.youtube
                            || profile.contacts.github
                            || profile.contacts.mainLink
                                ? <div>Contacts:
                                    <div>
                                        <div>{profile.contacts.facebook ? "Facebook: " + profile.contacts.facebook : ""}</div>
                                        <div>{profile.contacts.website ? "Website: " + profile.contacts.website : ""}</div>
                                        <div>{profile.contacts.vk ? "VK: " + profile.contacts.vk : ""}</div>
                                        <div>{profile.contacts.twitter ? "Twitter: " + profile.contacts.twitter : ""}</div>
                                        <div>{profile.contacts.instagram ? "Instagram: " + profile.contacts.instagram : ""}</div>
                                        <div>{profile.contacts.youtube ? "YouTube: " + profile.contacts.youtube : ""}</div>
                                        <div>{profile.contacts.github ? "GitHub: " + profile.contacts.github : ""}</div>
                                        <div>{profile.contacts.mainLink ? "Main link: " + profile.contacts.mainLink : ""}</div>
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