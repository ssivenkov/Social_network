import React from "react";
import { Header } from "./Header";
import { connect } from "react-redux";
import { setAuthUserData } from "../../redux/reducers/authReducer";
import { usersAPI } from "../../api/api";

class HeaderContainer extends React.Component<any, any> {
    componentDidMount() {
        usersAPI.getAuth()
            .then(data => {
                if (data.resultCode === 0) {
                    let {id, email, login} = data.data;
                    this.props.setAuthUserData(id, email, login);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: any) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})
export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);