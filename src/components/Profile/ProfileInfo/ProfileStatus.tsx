import React, { useEffect, useState } from "react";

type ProfileInfoPropsType = {
    statusFromProps: string
    updateStatus: (status: string) => void
}

const ProfileStatus: React.FC<ProfileInfoPropsType> = ({statusFromProps, updateStatus}) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [status, setStatus] = useState<string>(statusFromProps);

    useEffect(() => {
        setStatus(statusFromProps);
    }, [statusFromProps])

    const activateEditMode = () => {
        setStatus(status);
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        updateStatus(status);
    }

    const onStatusChange = (statusString: string) => {
        setStatus(statusString);
    }

    return <div>
        {!editMode &&
        <div>
            <span onClick={activateEditMode}>{status || "No status set"}</span>
        </div>
        }
        {editMode &&
        <div>
            <input autoFocus
                   value={status}
                   onBlur={deactivateEditMode}
                   onChange={(e) => onStatusChange(e.currentTarget.value)}
            >
            </input>
        </div>
        }
    </div>
}

export default ProfileStatus;