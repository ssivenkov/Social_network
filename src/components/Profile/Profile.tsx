import React from "react";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { MyPostsContainer } from "./MyPosts/MyPostsContainer";
import { ProfilePropsType } from "./ProfileContainer";

export const Profile: React.FC<ProfilePropsType> = ({profile, isOwner, status, updateStatus, savePhoto}) => {
    return (
        <div>
            <ProfileInfo profile={profile}
                         isOwner={isOwner}
                         status={status}
                         updateStatus={updateStatus}
                         savePhoto={savePhoto}
            />
            <MyPostsContainer/>
        </div>
    );
}