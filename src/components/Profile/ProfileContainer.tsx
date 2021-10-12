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
type OwnProps = MapDispatchToPropsType & MapStateToPropsType
type PropsType = RouteComponentProps<MatchParamsType> & OwnProps

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = +this.props.match.params.userId;
        if (!userId) {
            userId = 2;
        }
        this.props.getUserProfile(userId);
    }

    render() {
        if (!this.props.isAuth) return <Redirect to={"/login"}/>

        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
})

let WithUrlDataContainerComponent = withRouter(ProfileContainer)
export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);