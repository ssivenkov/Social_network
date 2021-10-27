import React from "react";
import { Header } from "./Header";
import { connect } from "react-redux";
import { getAuthUserData, logout } from "../../redux/reducers/authReducer";
import { RootStateType } from "../../redux/reduxStore";

type MapStateToPropsType = {
    login: string | null
    isAuth: boolean
}

const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
    login: state.auth.login,
    isAuth: state.auth.isAuth,
})

type MapDispatchToPropsType = {
    getAuthUserData: () => void
    logout: () => void
}

export type HeaderPropsType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderPropsType> {
    componentDidMount() {
        this.props.getAuthUserData()
    }

    render() {
        return <Header {...this.props}/>
    }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, RootStateType>
(mapStateToProps, {getAuthUserData, logout})(HeaderContainer);