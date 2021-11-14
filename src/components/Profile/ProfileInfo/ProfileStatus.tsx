import React, { useEffect, useState } from "react";

type ProfileInfoPropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatus: React.FC<ProfileInfoPropsType> = ({status, updateStatus}) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [localStatus, setLocalStatus] = useState<string>(status);

    useEffect(() => {
        setLocalStatus(status);
    }, [status])

    const activateEditMode = () => {
        setLocalStatus(localStatus);
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        updateStatus(localStatus);
    }

    const onStatusChange = (statusString: string) => {
        setLocalStatus(statusString);
    }

    return <div>
        {!editMode &&
        <div>
            <span onClick={activateEditMode}>{localStatus || "No status set"}</span>
        </div>
        }
        {editMode &&
        <div>
            <input autoFocus
                   value={localStatus}
                   onBlur={deactivateEditMode}
                   onChange={(e) => onStatusChange(e.currentTarget.value)}
            >
            </input>
        </div>
        }
    </div>
}

export default ProfileStatus;