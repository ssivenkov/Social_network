import React, { useState } from "react";
import s from "./ProfileInfo.module.scss";
import { Preloader } from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/user.png";
import { ProfileType } from "../../../redux/reducers/profileReducer";
import ProfileStatus from "./ProfileStatus"
import ProfileDataFormReduxForm from "./ProfileDataForm";

type ProfileInfoPropsType = {
    profile: null | ProfileType
    isOwner: boolean
    status: string
    updateStatus: (status: string) => void
    savePhoto: (photoFile: File) => void
    saveProfile: any
}

export const infoIsAbsent = "information is absent";
type ContactType = {
    contactTitle: string
    contactValue: string
}

const Contact: React.FC<ContactType> = ({contactTitle, contactValue}) => {
    return <div>
        {contactTitle}: {contactValue}
    </div>
}

const ProfileData: React.FC<any> = ({profile, isOwner, enableEditMode}) => {
    return <div className={s.user_desc}>
        {isOwner && <div>
            <button onClick={enableEditMode}>Edit</button>
        </div>}
        <div className={s.user_name}>{profile.fullName ? profile.fullName : infoIsAbsent}</div>
        <div>Looking for a job: {profile.lookingForAJob ? "yes" : "no"}</div>
        <div>Skills: {profile.lookingForAJobDescription ? profile.lookingForAJobDescription : infoIsAbsent}</div>
        <div>About me: {profile.aboutMe ? profile.aboutMe : infoIsAbsent}</div>
        <div>
            <span>Contacts: </span>
            {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
            })}
        </div>
    </div>
}

export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
    profile,
    isOwner,
    status,
    updateStatus,
    savePhoto,
    saveProfile,
}) => {
    let [editMode, setEditMode] = useState<boolean>(false);

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: any) => {
        if (e.target.files.length === 1) {
            savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (profile: any) => {
        saveProfile(profile)
            .then(() => {
                setEditMode(false);
            })
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
                    <ProfileStatus status={status}
                                   updateStatus={updateStatus}
                    />
                    {editMode
                        ? <ProfileDataFormReduxForm onSubmit={onSubmit}
                                                    profile={profile}
                                                    initialValues={profile}
                        />
                        : <ProfileData profile={profile}
                                       isOwner={isOwner}
                                       enableEditMode={() => setEditMode(true)}
                        />
                    }
                </div>
            </div>
        </div>
    );
};