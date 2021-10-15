import React from "react";
import { Profile } from "./Profile";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { getUserProfile, ProfileType } from "../../redux/reducers/profileReducer";
import { RootStateType } from "../../redux/reduxStore";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

type MapStateToPropsType = {
    profile: null | ProfileType
}

type MapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
}

type MatchParamsType = {
    userId: string
}

export type ProfilePropsType = RouteComponentProps<MatchParamsType> & MapStateToPropsType & MapDispatchToPropsType

class ProfileContainer extends React.Component<ProfilePropsType> {
    componentDidMount() {
        let userId = +this.props.match.params.userId;
        if (!userId) {
            userId = 2;
        }
        this.props.getUserProfile(userId);
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
})

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, RootStateType>
    (mapStateToProps, {getUserProfile}),
    withRouter,
    withAuthRedirect,
)(ProfileContainer);