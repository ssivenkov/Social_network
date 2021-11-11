import React, { useEffect, useState } from "react";

const ProfileStatusWithHooks = (props: any) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [status, setStatus] = useState<string>(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status])

    const activateEditMode = () => {
        setStatus(status);
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
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

export default ProfileStatusWithHooks;