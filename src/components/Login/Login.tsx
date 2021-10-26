import React from "react"
import s from "./Login.module.css"
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Input } from "../common/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../../utils/validators/validator";

type FormDataType = {
    login: string
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
                       name={"login"}
                       component={Input}
                       validate={[required, maxLength100]}
                       placeholder={"login"}
                       className={s.login}/>
            </div>
            <div className={s.field}>
                <Field type={"password"}
                       name={"password"}
                       component={Input}
                       validate={[required, maxLength100]}
                       placeholder={"password"}
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

const Login = () => {
    const onSubmit = (formData: FormDataType) => {
        console.log(formData)
    }
    return <div>
        <h1>Login form:</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

export default Login;