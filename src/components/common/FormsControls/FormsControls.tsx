import React from "react";
import s from "./FormsControls.module.scss"

export const FormControl: React.FC<any> = ({input, meta, ...props}) => {
    const hasError = meta.error && meta.touched;
    return (
        <div className={hasError ? s.formControlError : ''}>
            <div>
                {props.children}
            </div>
            <div>
                {hasError && <span>{meta.error}</span>}
            </div>
        </div>
    )
}

export const Textarea = (props: any) => {
    const {input, meta, children, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

export const Input = (props: any) => {
    const {input, meta, children, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}