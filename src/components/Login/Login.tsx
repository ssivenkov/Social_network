import React from "react"
import s from "./Login.module.scss"
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Input } from "../common/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../../utils/validators/validator";
import { login } from "../../redux/reducers/authReducer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { RootStateType } from "../../redux/reduxStore";

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const maxLength100 = maxLengthCreator(100);

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}
              className={s.formContainer}
        >
            <div className={s.field}>
                <Field type={"text"}
                       name={"email"}
                       component={Input}
                       validate={[required, maxLength100]}
                       placeholder={"Email"}
                       className={s.login}/>
            </div>
            <div className={s.field}>
                <Field type={"password"}
                       name={"password"}
                       component={Input}
                       validate={[required, maxLength100]}
                       placeholder={"Password"}
                       className={s.password}/>
            </div>
            <div className={s.field}>
                <Field type={"checkbox"}
                       name={"rememberMe"}
                       component={"input"}/> remember me
            </div>
            <div className={s.field}>
                <button type={"submit"}>
                    Submit
                </button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({form: "login"})(LoginForm)

type LoginPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
    isAuth: boolean
}

const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return <div>
        <h1>Login form:</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state: RootStateType) => ({
    isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps, {login})(Login);