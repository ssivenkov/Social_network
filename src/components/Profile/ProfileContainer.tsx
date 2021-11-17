import React from "react";
import { Profile } from "./Profile";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { getUserProfile, getStatus, updateStatus, ProfileType, savePhoto } from "../../redux/reducers/profileReducer";
import { RootStateType } from "../../redux/reduxStore";
import { compose } from "redux";

type MapStateToPropsType = {
    profile: null | ProfileType
    isOwner: boolean
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}

type MapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (photo: any) => void
}

type MatchParamsType = {
    userId: string
}

export type ProfilePropsType = RouteComponentProps<MatchParamsType> & MapStateToPropsType & MapDispatchToPropsType

class ProfileContainer extends React.Component<ProfilePropsType> {
    refreshProfile() {
        let userId: number | null = Number(this.props.match.params.userId);
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        if (typeof userId === "number") {
            this.props.getUserProfile(userId);
        }
        if (typeof userId === "number") {
            this.props.getStatus(userId);
        }
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: Readonly<ProfilePropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile {...this.props}
                     profile={this.props.profile}
                     isOwner={!this.props.match.params.userId}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto}
            />
        )
    }
}

let mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    isOwner: state.profilePage.isOwner,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
})

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, RootStateType>
    (mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto}),
    withRouter,
)(ProfileContainer);