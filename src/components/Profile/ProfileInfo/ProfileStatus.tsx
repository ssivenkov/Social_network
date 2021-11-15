import React, { ChangeEvent } from "react";

type MapDispatchToPropsType = {
    updateStatus: (status: string) => void
}

type MapStateToPropsType = {
    status: string
}

export type ProfileStatusPropsType = MapStateToPropsType & MapDispatchToPropsType;

class ProfileStatus extends React.Component<ProfileStatusPropsType> {
    state = {
        editMode: false,
        status: this.props.status,
    }

    activateEditMode = () => {
        this.setState({
            editMode: true,
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false,
        });
        this.props.updateStatus(this.state.status);
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value,
        })
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return <div>
            {!this.state.editMode ?
                <div>
                    <span onClick={this.activateEditMode}>{this.props.status || "---"}</span>
                </div>
                :
                <div>
                    <input autoFocus
                           onChange={this.onStatusChange}
                           onBlur={this.deactivateEditMode}
                           value={this.state.status}>

                    </input>
                </div>
            }
        </div>
    }
}

export default ProfileStatus;