import React, { ChangeEvent, useState } from "react";
import s from "./ProfileInfo.module.scss";
import { Preloader } from "../../common/Preloader/Preloader";
import AnonymousUserPhoto from "../../../assets/images/user.png";
import { ProfileContacts, ProfileType } from "../../../redux/reducers/profileReducer";
import ProfileStatus from "./ProfileStatus"
import ProfileDataFormReduxForm from "./ProfileDataForm";
import Button from "../../common/Button/Button";

type ProfileInfoPropsType = {
    profile: null | ProfileType
    isOwner: boolean
    status: string
    updateStatus: (status: string) => void
    savePhoto: (photoFile: File) => void
    saveProfile: (profile: ProfileType) => any
}

type ContactType = {
    contactTitle: string
    contactValue: string | null
}

const Contact: React.FC<ContactType> = ({contactTitle, contactValue}) => {
    return <div>
        {contactTitle}: {contactValue}
    </div>
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    enableEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, enableEditMode}) => {
    return <div className={s.user_desc}>
        {isOwner && <div>
            <Button onClick={enableEditMode}>
                Edit info
            </Button>
        </div>}
        <div className={s.user_name}>{profile.fullName ? profile.fullName : "information is absent"}</div>
        <div>Looking for a job: {profile.lookingForAJob ? "yes" : "no"}</div>
        {profile.lookingForAJobDescription && <div>Skills: {profile.lookingForAJobDescription}</div>}
        {profile.aboutMe && <div>About me: {profile.aboutMe}</div>}
        {/* if there is at least 1 filled contact then perform the render */
            !Object.keys(profile.contacts).map(key => {return profile.contacts[key as keyof ProfileContacts]})
                .every(el => el === null) &&
            <div>
                <span>Contacts: </span>
                {Object.keys(profile.contacts).map(key => {
                    return profile.contacts[key as keyof ProfileContacts]
                        ? <Contact key={key}
                                   contactTitle={key}
                                   contactValue={profile.contacts[key as keyof ProfileContacts]}/>
                        : null
                })}
            </div>
        }
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

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length === 1) {
            savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (profile: ProfileType) => {
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
                        src={profile.photos.large || AnonymousUserPhoto}
                        alt={profile.fullName + " user avatar"}
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
                                   isOwner={isOwner}
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