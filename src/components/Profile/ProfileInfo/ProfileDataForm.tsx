import React from "react";
import s from "./ProfileInfo.module.scss";
import { createField, Input, Textarea } from "../../common/FormsControls/FormsControls";
import { reduxForm } from "redux-form";
import { ProfileType } from "../../../redux/reducers/profileReducer";
import inputErrorStyle from "../../common/FormsControls/FormsControls.module.scss";

type ProfileDataFormPropsType = {
    profile: ProfileType
}

const ProfileDataForm: React.FC<any> = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit} className={s.user_desc}>
        <div>
            <button>Save</button>
        </div>
        {error && <div className={inputErrorStyle.formSummaryError}>
            {error}
        </div>
        }
        <div className={s.user_name}>
            <span>Full name: </span>
            {createField("Full name", "fullName", [], Input, {}, "", "", "")}
        </div>
        <div>
            <span>Looking for a job: </span>
            {createField("", "lookingForAJob", [], Input, {type: "checkbox"}, "", "", "")}
        </div>
        <div>
            <span>Skills: </span>
            {createField("Skills", "lookingForAJobDescription", [], Textarea, {}, "", "", "")}
        </div>
        <div>
            <span>About me: </span>
            {createField("About me", "aboutMe", [], Textarea, {}, "", "", "")}
        </div>
        <div>
            <span>Contacts: </span>
            {Object.keys(profile.contacts).map(key => {
                return <div key={key}>
                    {key}: {createField(key, `contacts.${key}`, [], Input, {}, "", "", "")}
                </div>
            })}
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm<{}, ProfileDataFormPropsType>
({form: "edit-profile"})(ProfileDataForm);

export default ProfileDataFormReduxForm;