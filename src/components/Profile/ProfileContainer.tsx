import React from "react";
import { Profile } from "./Profile";
import { connect } from "react-redux";
import { Redirect, withRouter, RouteComponentProps } from "react-router-dom";
import { getUserProfile, ProfileType } from "../../redux/reducers/profileReducer";
import { RootStateType } from "../../redux/reduxStore";

type MapStateToPropsType = {
    profile: null | ProfileType
    isAuth: boolean
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

let AuthRedirectComponent = (props: any) => {
    if (!props.isAuth) return <Redirect to={"/login"}/>
    return <ProfileContainer {...props}/>
}

let mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
})

let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);
export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, RootStateType>
(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);